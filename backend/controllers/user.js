const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { sendMail } = require("../middlewares/sendMail.js");
const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    let user = await User.findOne({ email });

    if (user)
      return res.status(400).json({
        message: "User Already exists",
      });

    const hashPassword = await bcrypt.hash(password, 10);

    user = {
      name,
      email,
      password: hashPassword,
    };

    const otp = Math.floor(Math.random() * 1000000);

    const token = jwt.sign({ user, otp }, process.env.secretKey, {
      expiresIn: "5m",
    });

    const data = {
      name,
      otp,
    };

    await sendMail(email, "E learning", data);

    res.status(200).json({
      message: "Otp send to your mail",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const verifyUser = async (req, res) => {
  const { otp, token } = req.body;

  const verify = jwt.verify(token, process.env.secretKey);

  if (!verify)
    return res.status(400).json({
      message: "Otp Expired",
    });

  if (verify.otp !== otp)
    return res.status(400).json({
      message: "Wrong Otp",
    });

  await User.create({
    name: verify.user.name,
    email: verify.user.email,
    password: verify.user.password,
  });

  res.json({
    message: "User Registered",
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user)
    return res.status(400).json({
      message: "Incorrect Email-Id",
    });

  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword)
    return res.status(400).json({
      message: "Incorrect Password",
    });

  const token = await jwt.sign({ _id: user._id }, process.env.secretKey, {
    expiresIn: "1d",
  });

  return res.json({
    message: `Welcome back ${user.name}`,
    token,
    user,
  });
};

const userProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json({ user });
};

module.exports = {
  register,
  verifyUser,
  loginUser,
  userProfile,
};
