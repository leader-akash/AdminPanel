import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';
import User from './pages/User.jsx';
import UserManagement from './components/admin/UserManagement.jsx';
import TaskManagement from './components/admin/TaskManagement.jsx';
import { ToastContainer } from 'react-toastify';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));

  return (
    <div className="container mx-auto p-4">
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} setRole={setRole} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login setToken={setToken} setRole={setRole} />} />
        <Route path="/user" element={<User setToken={setToken} setRole={setRole} />} />
        <Route path="/admin/users" element={<UserManagement setToken={setToken} setRole={setRole} />} />
        <Route path="/admin/tasks" element={<TaskManagement setToken={setToken} setRole={setRole} />} />
      </Routes>


      <ToastContainer />


    </div>

  );
}

export default App;