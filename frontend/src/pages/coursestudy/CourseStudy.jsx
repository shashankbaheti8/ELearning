import React, { useEffect, useState } from "react";
import "./coursestudy.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { serverURL } from "../../main";

const CourseStudy = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchCourse, course } = CourseData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role !== "admin" && !user.subscription.includes(id)) {
      navigate("/");
    }
  }, [user, id]);

  useEffect(() => {
    const loadCourse = async () => {
      await fetchCourse(id);
      setLoading(false);
    };
    loadCourse();
  }, [id]);

  if (loading || !course) {
    return <div className="loading-message">Loading course details...</div>;
  }

  return (
    <div className="course-study-page">
      <div className="course-card">
        <img src={`${serverURL}/${course.image}`} alt={course.title} />
        <h2>{course.title}</h2>
        <h4>{course.description}</h4>
        <h5>by - {course.createdBy}</h5>
        <h5>Duration - {course.duration} weeks</h5>
        <Link to={`/lectures/${course._id}`} className="lecture-link">
          Go to Lectures
        </Link>
      </div>
    </div>
  );
};

export default CourseStudy;
