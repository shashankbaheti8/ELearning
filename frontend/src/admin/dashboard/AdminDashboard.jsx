import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../utils/Layout";
import axios from "axios";
import { serverURL } from "../../main";
import "./admindashboard.css";

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role !== "admin") navigate("/");
  }, [user, navigate]);

  const [stats, setStats] = useState({});

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${serverURL}/api/stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setStats(data.stats);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <Layout>
      <div className="admin-dashboard-container">
        <h2 className="dashboard-title">Admin Dashboard</h2>
        <div className="stats-grid">
          <div className="stats-box">
            <h4>Total Courses</h4>
            <p>{stats.totalCoures || 0}</p>
          </div>
          <div className="stats-box">
            <h4>Total Lectures</h4>
            <p>{stats.totalLectures || 0}</p>
          </div>
          <div className="stats-box">
            <h4>Total Users</h4>
            <p>{stats.totalUsers || 0}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
