# 🎓 E-Learning Management System (LMS)

A full-stack web application for managing online learning experiences. It supports **multi-role access** including students, admins, and superadmins, and enables users to view, manage, and interact with courses and users. Built with **React + Vite** on the frontend and **Node.js + Express + MongoDB** on the backend.

🔗 **Live App:**
➡️ [https://elearning-frontend-yhks.onrender.com/](https://elearning-frontend-yhks.onrender.com/)

---

## 🗂️ Table of Contents

* [✨ Features](#-features)
* [🛠 Tech Stack](#-tech-stack)
* [🚀 Setup Instructions](#-setup-instructions)

  * [1. Clone Repository](#1-clone-repository)
  * [2. Backend Setup](#2-backend-setup)
  * [3. Frontend Setup](#3-frontend-setup)
* [🔐 Role-based Access](#-role-based-access)
* [🧠 Architecture Overview](#-architecture-overview)
* [🌐 Deployment](#-deployment)
* [📚 Learnings](#-learnings)

---

## ✨ Features

* 🧑‍🎓 **Student Dashboard** – View enrolled courses and progress.
* 🧑‍🏫 **Admin Panel** – Create, edit, and manage courses, lectures, and users.
* 🛡 **Superadmin Access** – Manage user roles (admin/user).
* ✅ **Authentication & Authorization** – JWT-based secure login system.
* 🔑 **Role-based Routing** – Access is controlled based on user roles.
* 📚 **Course Management** – Add/edit lectures with details (price, duration, etc.).
* 📱 **Fully Responsive** – Mobile-friendly UI with a clean, modern layout.

---

## 🛠 Tech Stack

| Frontend           | Backend           | DevOps / Tools      |
| ------------------ | ----------------- | ------------------- |
| React + Vite       | Node.js + Express | Vercel (Frontend)   |
| Tailwind CSS / CSS | MongoDB Atlas     | Render (Backend)    |
| Axios              | Mongoose          | JWT Auth            |
| React Router v6    |                   | Toast Notifications |

---

## 🚀 Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/shashankbaheti8/elearning.git
cd elearning
```

---

### 2. Backend Setup

```bash
cd backend
# Fill in your MongoDB URI and JWT secret in .env

npm install
npm run dev
```

#### .env Format:

```env
PORT=3000
URL=mongodb+srv://...
secretKey=your-secret-key
Gmail=
Password=
```

---

### 3. Frontend Setup

```bash
cd ../frontend
# Fill in your backend URL in .env file

npm install
npm run dev
```

#### .env Format:

```env
VITE_BACKEND_URL=http://localhost:3000
```

Now open [http://localhost:5173](http://localhost:5173) to start using the application!

---

## 🔐 Role-based Access

| Role       | Access                                                                 |
| ---------- | ---------------------------------------------------------------------- |
| User       | View available courses, enroll, track progress                         |
| Admin      | Add/edit/delete courses and lectures, manage enrolled students         |
| Superadmin | Full control including managing all users and promoting/demoting roles |

---

## 🧠 Architecture Overview

### 🧩 Authentication Flow

* User signs in → Backend issues JWT → Token stored in localStorage
* Requests include token in headers → Backend verifies token and grants access

### 📦 Folder Structure (Frontend)

```bash
src/
│
├── components/       # Reusable UI components
├── context/          # Context-API for data management
├── pages/            # Login, Register, Dashboard, AdminPages
├── utils/            # Layouts, Auth, Axios instance
├── App.jsx           # Routes
└── main.jsx          # App entry point
```

---

## 🌐 Deployment

### ✅ Frontend

Deployed using **Vercel**

```bash
VITE_BACKEND_URL=https://your-backend.onrender.com
```

### ✅ Backend

Deployed using **Vercel**

Set your environment variables for PORT, Gmail, Password, MongoDB URI and JWT secret.

---

