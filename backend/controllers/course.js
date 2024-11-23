const Course = require("../models/course");
const Lecture = require("../models/lecture");
const User = require("../models/user");

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json({
      courses,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.json({
      course,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const fetchLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find({ course: req.params.id });

    const user = await User.findById(req.user._id);

    if (user.role === "admin") {
      return res.json({ lectures });
    }

    if (!user.subscription.includes(req.params.id))
      return res.status(400).json({
        message: "You have not subscribed to this course",
      });

    res.json({ lectures });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getLectureById = async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id);

    const user = await User.findById(req.user._id);

    if (user.role === "admin") {
      return res.json({ lecture });
    }

    if (!user.subscription.includes(lecture.course))
      return res.status(400).json({
        message: "You have not subscribed to this course",
      });

    res.json({ lecture });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyCourses = async (req, res) => {
  try {
    const courses = await Course.find({ _id: req.user.subscription });

    res.json({
      courses,
    });
  } catch {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  fetchLectures,
  getLectureById,
  getMyCourses,
};
