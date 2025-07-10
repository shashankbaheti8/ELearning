import React from "react";
import "./dashboard.css";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";

const Dashbord = () => {
  const { mycourse } = CourseData();

  return (
    <div className="student-dashboard">
      <h2>Your Enrolled Courses</h2>
      <p className="subtitle">Keep learning. Keep growing. 🚀</p>

      <div className="dashboard-content">
        {mycourse && mycourse.length > 0 ? (
          mycourse.map((e) => <CourseCard key={e._id} course={e} />)
        ) : (
          <div className="no-course">
            <img src="/no-courses.svg" alt="No courses" />
            <p>No courses enrolled yet. Start exploring!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashbord;
