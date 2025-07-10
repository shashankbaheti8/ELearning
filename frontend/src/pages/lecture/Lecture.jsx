import React, { useEffect, useState } from "react";
import "./lecture.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { serverURL } from "../../main";
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";

const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState({});
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    if (user && user.role !== "admin" && !user.subscription.includes(params.id))
      return navigate("/");
    fetchLectures();
  }, []);

  const fetchLectures = async () => {
    try {
      const { data } = await axios.get(
        `${serverURL}/api/lectures/${params.id}`,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      setLectures(data.lectures);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLecture = async (id) => {
    setLecLoading(true);
    try {
      const { data } = await axios.get(`${serverURL}/api/lecture/${id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setLecture(data.lecture);
    } catch (err) {
      console.log(err);
    } finally {
      setLecLoading(false);
    }
  };

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", video);

    try {
      const { data } = await axios.post(
        `${serverURL}/api/course/${params.id}`,
        formData,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );

      toast.success(data.message);
      setTitle("");
      setDescription("");
      setVideo("");
      setVideoPrev("");
      setShowForm(false);
      fetchLectures();
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setBtnLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this lecture?")) {
      try {
        const { data } = await axios.delete(`${serverURL}/api/lecture/${id}`, {
          headers: { token: localStorage.getItem("token") },
        });
        toast.success(data.message);
        fetchLectures();
      } catch (err) {
        toast.error(err.response?.data?.message || "Delete failed");
      }
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="lecture-page">
      <div className="left">
        {lecLoading ? (
          <Loading />
        ) : lecture?.video ? (
          <>
            <video
              src={`${serverURL}/${lecture.video}`}
              width="100%"
              controls
              controlsList="nodownload noremoteplayback"
              disablePictureInPicture
              disableRemotePlayback
              autoPlay
            />
            <h1>{lecture.title}</h1>
            <p>{lecture.description}</p>
          </>
        ) : (
          <h1>Please Select a Lecture</h1>
        )}
      </div>

      <div className="right">
        {user?.role === "admin" && (
          <button className="common-btn" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Close" : "Add Lecture +"}
          </button>
        )}

        {showForm && (
          <div className="lecture-form">
            <h2>Add Lecture</h2>
            <form onSubmit={submitHandler}>
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <label htmlFor="description">Description</label>
              <input
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />

              <label htmlFor="file">Video File</label>
              <input
                id="file"
                type="file"
                accept="video/*"
                onChange={changeVideoHandler}
                required
              />

              {videoPrev && (
                <video
                  src={videoPrev}
                  width="100%"
                  height="auto"
                  controls
                  style={{ marginBottom: "10px" }}
                />
              )}

              <button
                type="submit"
                className="common-btn"
                disabled={btnLoading}
              >
                {btnLoading ? "Uploading..." : "Add"}
              </button>
            </form>
          </div>
        )}

        {lectures?.length > 0 ? (
          lectures.map((lec, index) => (
            <div key={lec._id} className="lecture-item">
              <div
                className={`lecture-number ${
                  lecture._id === lec._id ? "active" : ""
                }`}
                onClick={() => fetchLecture(lec._id)}
              >
                {index + 1}. {lec.title}
              </div>
              {user?.role === "admin" && (
                <button
                  className="common-btn delete-btn"
                  onClick={() => deleteHandler(lec._id)}
                >
                  Delete
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No Lectures Yet!</p>
        )}
      </div>
    </div>
  );
};

export default Lecture;
