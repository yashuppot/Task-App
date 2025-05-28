# 📝 Task Manager App (Full-Stack MERN)

A simple task management application built with the **MERN** stack. This app allows users to create, view, update, and delete tasks through a responsive UI and RESTful API.

---

## 🚀 Features

- Full **CRUD** functionality for tasks and persistent storage with mongodb
- Clean UI with React and tailwindcss
- REST API built with express.js
- Inline error handling and input validation

---

## 🚀 App Demo

[![thumbnail](https://img.youtube.com/vi/SJjowMdjVL4/0.jpg)](https://www.youtube.com/watch?v=SJjowMdjVL4)

---

## 📁 Folder Structure

```
task-app/
├── backend/       → Express API + Mongoose
├── frontend/      → React + Tailwind UI
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yashuppot/task-app.git
cd task-manager-app
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder with the following content:

```
PORT=5000
MONGO_URI=your_mongo_connection_string_here
```

Start the backend server:

```bash
node server.js
```

The API will be available at:  
`http://localhost:5000/tasks`

---

### 3. Frontend Setup

In a **separate terminal**:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on:  
`http://localhost:5173`

---

## 🧠 Development Process

- Started by **modeling the data** using Mongoose with help from ChatGPT, as I had limited prior experience with MongoDB
- Used the **MVC pattern** in the backend for organization as is standard in Node apps
- Created the skeleton for the **REST API** first, keeping the endpoints focused and consistent
- Connected the **frontend to the API early**, so I could test end-to-end from the start
- Postponed styling until the core logic worked — **Tailwind CSS** allowed me to quickly style the UI as needed
- Built out frontend functionality incrementally, updating or extending the **backend API routes** as necessary to support new flows like editing and deleting
- Focused on **simplicity, clarity, and modularity** in both backend and frontend logic

---

## ⚠️ Challenges & Reflections

- **Input validation** using manual `trim()` checks can get awkward as more fields are added to a task; something like **Zod** with React for schema validation would be more declarative
- The frontend has **no enforced data types**, making it awkward to work with task data — **TypeScript** would help to enforce the shape of data as mongoose does on the backend
- Managing view state (e.g., selected task vs edit mode vs creation) became messier as more states were added — using a **state enum** might improve clarity


---

## 📦 Tech Stack

- **Frontend**: React, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB (Atlas or local)

---
