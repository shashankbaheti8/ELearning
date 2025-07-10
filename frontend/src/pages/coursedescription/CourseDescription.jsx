import React, { useEffect, useState } from "react";
import "./coursedescription.css";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { UserData } from "../../context/UserContext";
import { serverURL } from "../../main";
import toast from "react-hot-toast";
import Loading from "../../components/loading/Loading";

const CourseDescription = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { fetchCourse, course } = CourseData();
  const { fetchUser } = UserData();

  useEffect(() => {
    fetchCourse(id);
  }, [id]);

  const handleBuyNow = async () => {
    toast.error("Payment Section not added");
    setLoading(false);
  };

  if (loading) return <Loading />;

  return (
    course && (
      <div className="course-description">
        <div className="course-container">
          <div className="course-header">
            <img
              src={`${serverURL}/${course.image}`}
              alt={course.title}
              className="course-image"
            />

            <div className="course-info">
              <h2>{course.title}</h2>
              <p>
                <strong>Instructor:</strong> {course.createdBy}
              </p>
              <p>
                <strong>Duration:</strong> {course.duration} weeks
              </p>

              <div className="course-tags">
                <span className="tag">
                  Category: {course.category || "General"}
                </span>
                {course.isTrending && (
                  <span className="tag trending">🔥 Trending</span>
                )}
              </div>
            </div>
          </div>

          <p className="course-description-text">{course.description}</p>

          {course.points?.length > 0 && (
            <>
              <h3 className="learn-heading">What you’ll learn</h3>
              <ul className="learning-points">
                {course.points.map((point, index) => (
                  <li key={index}>✅ {point}</li>
                ))}
              </ul>
            </>
          )}

          <p className="course-price">
            Start learning today for just <strong>₹{course.price}</strong>
          </p>

          {user?.subscription.includes(course._id) ? (
            <button
              onClick={() => navigate(`/course/study/${course._id}`)}
              className="common-btn"
            >
              Study Now
            </button>
          ) : (
            <button onClick={handleBuyNow} className="common-btn">
              Buy Now
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default CourseDescription;
