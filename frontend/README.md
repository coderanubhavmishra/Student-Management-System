# 🎓 Student Management System

A full-stack **Student Management System** built using **Spring Boot**, **React**, **JWT Authentication**, and **MySQL**. The application provides secure authentication, role-based access, student management, dashboard analytics, and an admin management module.

---

## 🚀 Features

### 🔐 Authentication & Security

* JWT Authentication
* Spring Security
* BCrypt Password Encryption
* Secure Login
* Protected Routes
* Role-Based Authentication
* Super Admin & Admin Support

### 👨‍🎓 Student Management

* Add Student
* View Student
* Edit Student
* Delete Student
* Student Profile Page
* Search Students
* Sort Students
* Pagination

### 📊 Dashboard

* Dashboard Statistics
* Student Count
* Course Count
* Recent Students
* Charts & Analytics

### 👨‍💼 Admin Management

* Super Admin Panel
* Create Admin
* Delete Admin
* Multiple Admin Support
* Protected Admin APIs

### 📚 Course Module

* View All Courses
* View Students by Course

### 🎨 User Interface

* Responsive Design
* Modern Dashboard
* Loading Spinner
* Toast Notifications
* Custom 404 Page

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* React Toastify
* Lucide React

## Backend

* Spring Boot
* Spring Security
* Spring Data JPA
* JWT Authentication
* Maven

## Database

* MySQL

---


# 🔑 User Roles

## Super Admin

* Login
* Manage Students
* Create Admin
* Delete Admin
* View Dashboard
* Manage Courses

## Admin

* Login
* Manage Students
* View Dashboard
* View Courses

---



# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/coderanubhavmishra/Student-Management-System.git
```

---

## Backend

```bash
cd backend
```

Configure MySQL in `application.properties`.

Run:

```bash
mvn spring-boot:run
```

Backend runs on:

```
http://localhost:8080
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 🔐 Authentication

The application uses:

* JWT Token Authentication
* Spring Security
* BCrypt Password Encryption

Every protected API requires a valid JWT token.

---


# 👨‍💻 Author

**Anubhav Mishra**

MCA Student | Java Full Stack Developer

---
