const express = require("express");
const {
  register,
  verifyUser,
  loginUser,
  userProfile,
} = require("../controllers/user");
const { userAuth } = require("../middlewares/auth");

const router = express.Router();

router.post("/user/register", register);
router.post("/user/verify", verifyUser);
router.post("/user/login", loginUser);
router.get("/user/profile", userAuth, userProfile);

module.exports = router;
