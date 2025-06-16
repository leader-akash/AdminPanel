Admin User Management Application

Overview

This application is a task management system with separate admin and user panels. It uses Node.js/Express for the backend, MongoDB for the database, React with Vite, Tailwind CSS for the frontend, and JWT for authentication. The admin panel supports user management (view users, change status with immediate logout) and task management (view tasks, bulk actions, pagination, status updates). The user panel supports registration, login, task creation, and viewing.

Tech Stack:-

Backend: Node.js, Express
Database: MongoDB (MongoDB Atlas or local)
Frontend: React, Tailwind CSS, Material UI

Authentication: JWT (versioned for efficient session management)



Additional Libraries:
Backend: jsonwebtoken, bcryptjs, mongoose, dotenv, cors

Frontend: axios, react-router-dom, tailwindcss, Material UI


Setup Instructions

Prerequisites

Node.js: v22

MongoDB (local or MongoDB Atlas)


Git

Clone the Repository:


git clone <repository-url>

Backend setup:-

cd AdminPanel/backend



Install Dependencies:

npm install

MONGO_URI=mongodb://localhost:27017/admin-user-panel
JWT_SECRET=your_jwt_secret_key
PORT=5000


Start the Backend:

npm start

The backend will run on http://localhost:5000.


:- Frontend installation

Navigate to the Frontend Directory:

cd ../frontend


 Install Dependencies:

npm install



Start the Frontend:

npm run dev

The frontend will run on http://localhost:5173

Testing the Application





User Registration/Login:

Navigate to http://localhost:5173/register to create a new user.



Log in at http://localhost:5173/login.



Create and view tasks from the user dashboard.



Admin Panel:

Log in as an admin using credentials from the seed script (e.g., admin@gmail.com, password: test123).



Access the admin panel at http://localhost:5173/admin/users.



Test user management (view users, change status) and task management (view tasks, bulk actions, pagination).



Key Features to Test:


User Status Change: Change a user's status in the admin panel. The affected user should be logged out immediately.



Task Pagination: Navigate through task pages (5 tasks per page). Select tasks across multiple pages and verify the selected count.



Bulk Actions: Select multiple tasks and update their status (e.g., mark as completed, in progress or pending).


Implementation Details

Authentication:- 

JWT with Versioning: Each user has a tokenVersion field in the database. When an admin changes a user's status, the tokenVersion is incremented, invalidating the user's JWT without querying the database on every request.


Secure Login/Registration: Passwords are hashed using bcryptjs.



Admin Panel


User Management:


Lists all users with their status (active/inactive).


Admins can toggle user status, which increments the user's tokenVersion and logs them out.



Task Management:

Displays tasks with pagination (5 tasks per page).

Supports bulk actions (e.g., update status) for selected tasks.



Shows the count of selected tasks dynamically.

User Panel

Registration/Login: Users can register and log in securely. and can fetch their details.



Responsive Design


The frontend uses Tailwind CSS to ensure a fully responsive interface for desktop and mobile devices.

Database

MongoDB Schemas:


User: email, password, role (admin/user), status (active/inactive), tokenVersion.



Task: title, description, status ('pending', 'in_progress', 'completed'), user (reference to user).



