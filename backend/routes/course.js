const express = require("express");
const router = express.Router();

const {
  getAllCourses,
  getCourseById,
  fetchLectures,
  getLectureById,
  getMyCourses,
} = require("../controllers/course");
const { userAuth } = require("../middlewares/auth");

router.get("/course/all", getAllCourses);
router.get("/course/:id", getCourseById);
router.get("/lectures/:id", userAuth, fetchLectures);
router.get("/lecture/:id", userAuth, getLectureById);
router.get("/mycourse", userAuth, getMyCourses);

module.exports = router;
