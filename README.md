🚀 Admin User Management Application
A modern Task Management System with dedicated Admin and User panels. Built with the MERN stack, it supports user/task management, role-based access, JWT authentication with token versioning, and a responsive UI using Tailwind CSS and Material UI.

🛠️ Tech Stack
Frontend:

⚛️ React (Vite)

🎨 Tailwind CSS

🧩 Material UI

Backend:

🟩 Node.js + Express

🍃 MongoDB (local or Atlas)

Authentication:

🔐 JWT (with versioning for secure session invalidation)

Libraries Used:

Backend: jsonwebtoken, bcryptjs, mongoose, dotenv, cors

Frontend: axios, react-router-dom, tailwindcss, @mui/material

📦 Project Setup
⚙️ Prerequisites
Node.js v22+

MongoDB (local or Atlas)

Git

🧭 Installation Guide
🔁 Clone the Repository
bash
Copy
Edit
git clone <repository-url>
📂 Backend Setup
bash
Copy
Edit
cd AdminPanel/backend
Install Dependencies:
bash
Copy
Edit
npm install
Configure Environment Variables:
Create a .env file with:

env
Copy
Edit
MONGO_URI=mongodb://localhost:27017/admin-user-panel
JWT_SECRET=your_jwt_secret_key
PORT=5000
Start the Backend:
bash
Copy
Edit
npm start
✅ Runs on: http://localhost:5000

💻 Frontend Setup
bash
Copy
Edit
cd ../frontend
Install Dependencies:
bash
Copy
Edit
npm install
Start the Frontend:
bash
Copy
Edit
npm run dev
✅ Runs on: http://localhost:5173

🧪 How to Test the App
👤 User Panel
📝 Register: http://localhost:5173/register

🔐 Login: http://localhost:5173/login

➕ Create and view tasks from the user dashboard

🛡️ Admin Panel
🔑 Login using seeded credentials:

makefile
Copy
Edit
Email: admin@gmail.com
Password: test123
🔍 Access Admin Dashboard:

Users: http://localhost:5173/admin/users

Tasks: http://localhost:5173/admin/tasks

🌟 Key Features
✅ Authentication
Secure login/register with hashed passwords (bcryptjs)

JWT-based authentication

🔁 Token Versioning: Invalidate sessions when user status changes without extra DB queries

👥 Admin Panel
User Management:
View all users and their statuses

Toggle user status (active/inactive) with instant logout

Task Management:
View tasks with pagination (5 per page)

Select multiple tasks across pages

Apply bulk status updates (Pending / In Progress / Completed)

Dynamic selected task counter

👤 User Panel
Secure registration and login

Create and view personal tasks

📄 MongoDB Schema Overview
🧑 User
js
Copy
Edit
{
  email: String,
  password: String,
  role: 'admin' | 'user',
  status: 'active' | 'inactive',
  tokenVersion: Number
}
📋 Task
js
Copy
Edit
{
  title: String,
  description: String,
  status: 'pending' | 'in_progress' | 'completed',
  user: ObjectId (ref: 'User')
}
📱 Responsive UI
Built with Tailwind CSS

Optimized for desktop and mobile

