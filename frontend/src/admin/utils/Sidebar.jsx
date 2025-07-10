import React from "react";
import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { FaBook, FaUserAlt } from "react-icons/fa";
import { UserData } from "../../context/UserContext";
import "./util.css";

const Sidebar = () => {
  const { user } = UserData();
  return (
    <aside className="sidebar">
      <ul>
        <li>
          <Link to="/admin/dashboard">
            <AiFillHome className="icon" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/course">
            <FaBook className="icon" />
            <span>Courses</span>
          </Link>
        </li>
        {user?.mainrole === "superadmin" && (
          <li>
            <Link to="/admin/users">
              <FaUserAlt className="icon" />
              <span>Users</span>
            </Link>
          </li>
        )}
        <li>
          <Link to="/account">
            <AiOutlineLogout className="icon" />
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
