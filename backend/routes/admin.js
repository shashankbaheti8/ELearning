const express = require("express");
const router = express.Router();
const { userAuth, isAdmin } = require("../middlewares/auth");
const {
  createCourse,
  addLecture,
  deleteLecture,
  deleteCourse,
  getAllStats,
  getAllUser,
  updateRole,
} = require("../controllers/admin");
const { uploadFiles } = require("../middlewares/multer");

router.post("/course/new", userAuth, isAdmin, uploadFiles, createCourse);
router.post("/course/:id", userAuth, isAdmin, uploadFiles, addLecture);
router.delete("/lecture/:id", userAuth, isAdmin, deleteLecture);
router.delete("/course/:id", userAuth, isAdmin, deleteCourse);
router.get("/stats", userAuth, isAdmin, getAllStats);
router.put("/user/:id", userAuth, updateRole);
router.get("/users", userAuth, isAdmin, getAllUser);
module.exports = router;
