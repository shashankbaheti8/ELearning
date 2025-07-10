import React, { useEffect, useState } from "react";
import "./adminusers.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverURL } from "../../main";
import Layout from "../utils/Layout";
import toast from "react-hot-toast";

const AdminUsers = ({ user }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user && user.mainrole !== "superadmin") {
      navigate("/");
    } else {
      fetchUsers();
    }
  }, [user]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${serverURL}/api/users`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setUsers(data.users);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch users");
    }
  };

  const updateRole = async (id) => {
    if (window.confirm("Are you sure you want to update this user's role?")) {
      try {
        const { data } = await axios.put(
          `${serverURL}/api/user/${id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        toast.success(data.message);
        fetchUsers();
      } catch (error) {
        toast.error(error.response?.data?.message || "Role update failed");
      }
    }
  };

  return (
    <Layout>
      <div className="admin-users-page">
        <h1 className="page-title">All Users</h1>

        <div className="table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.length > 0 ? (
                users.map((e, i) => (
                  <tr key={e._id}>
                    <td>{i + 1}</td>
                    <td>{e.name}</td>
                    <td>{e.email}</td>
                    <td>{e.role}</td>
                    <td>
                      <button
                        onClick={() => updateRole(e._id)}
                        className="common-btn"
                      >
                        Update Role
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default AdminUsers;
