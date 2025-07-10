import React from "react";
import "./courses.css";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";

const Courses = () => {
  const { courses } = CourseData();
  // const courses = [
  //   {
  //     _id: "c123456789",
  //     image: "course-thumbnails/react-course.jpg",
  //     title: "Mastering React for Web Development",
  //     createdBy: "John Doe",
  //     duration: 6,
  //     price: 1499,
  //   },
  //   {
  //     _id: "c123456789",
  //     image: "course-thumbnails/react-course.jpg",
  //     title: "Mastering React for Web Development",
  //     createdBy: "John Doe",
  //     duration: 6,
  //     price: 1499,
  //   },
  //   {
  //     _id: "c123456789",
  //     image: "course-thumbnails/react-course.jpg",
  //     title: "Mastering React for Web Development",
  //     createdBy: "John Doe",
  //     duration: 6,
  //     price: 1499,
  //   },
  //   {
  //     _id: "c123456789",
  //     image: "course-thumbnails/react-course.jpg",
  //     title: "Mastering React for Web Development",
  //     createdBy: "John Doe",
  //     duration: 6,
  //     price: 1499,
  //   },
  // ];

  return (
    <div className="courses">
      <h2>Explore Our Courses</h2>

      <div className="course-container">
        {courses && courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))
        ) : (
          <p className="no-courses">No Courses Available Yet!</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
