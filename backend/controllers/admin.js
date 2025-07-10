const Course = require("../models/course");
const Lecture = require("../models/lecture");
const User = require("../models/user");
const { rm } = require("fs");
const fs = require("fs");
const { promisify } = require("util");

const createCourse = async (req, res) => {
  const { title, description, category, createdBy, duration, price } = req.body;
  const image = req.file;

  await Course.create({
    title,
    description,
    image: image?.path,
    price,
    duration,
    category,
    createdBy,
  });
  res.status(201).json({ message: "Course created successfully" });
};

const addLecture = async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course)
    return res.status(404).json({
      message: "No Course with this id",
    });

  const { title, description } = req.body;

  const file = req.file;

  const lecture = await Lecture.create({
    title,
    description,
    video: file?.path,
    course: course._id,
  });

  res.status(201).json({
    message: "Lecture Added",
    lecture,
  });
};

const deleteLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id);

    await lecture.deleteOne();

    res.json({ message: "Lecture Deleted" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const unlinkAsync = promisify(fs.unlink);

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    const lectures = await Lecture.find({ course: course._id });

    await Promise.all(
      lectures.map(async (lecture) => {
        await unlinkAsync(lecture.video);
      })
    );

    await Lecture.find({ course: req.params.id }).deleteMany();
    await course.deleteOne();
    await User.updateMany({}, { $pull: { subscription: req.params.id } });

    res.json({
      message: "Course Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllStats = async (req, res) => {
  try {
    const totalCoures = (await Course.find()).length;
    const totalLectures = (await Lecture.find()).length;
    const totalUsers = (await User.find()).length;

    const stats = {
      totalCoures,
      totalLectures,
      totalUsers,
    };

    res.json({
      stats,
    });
  } catch {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } }).select(
      "-password"
    );

    res.json({ users });
  } catch {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateRole = async (req, res) => {
  try {
    if (req.user.mainrole !== "superadmin")
      return res.status(403).json({
        message: "This feature is only available to superadmin",
      });

    const user = await User.findById(req.params.id);

    if (user.role === "user") {
      user.role = "admin";
      await user.save();

      return res.status(200).json({
        message: `Role of ${user.name} updated to admin`,
      });
    }

    if (user.role === "admin") {
      user.role = "user";
      await user.save();

      return res.status(200).json({
        message: `Role of ${user.name} updated to user`,
      });
    }
  } catch {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createCourse,
  addLecture,
  deleteLecture,
  deleteCourse,
  getAllStats,
  getAllUser,
  updateRole,
};
