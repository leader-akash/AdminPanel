import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import { TextField, Button, Alert, Typography } from '@mui/material';
import {toast} from 'react-toastify';

const Login = ({ setToken, setRole }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(!email.trim() || !password.trim()){
        setError('Please enter inputs');
        return
      }
      const { token, role } = await login(email, password);
      setToken(token);
      setRole(role);
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      toast.success(role === 'admin' ? "Admin logged in successfully" : "User logged in successfully")
      navigate(role === 'admin' ? '/admin/users' : '/user');
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <Typography variant="h5" className="text-center mb-4 content-margin">Login</Typography>
      {error && <Alert severity="error" className="content-margin mb-4">{error}</Alert>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          className='content-margin'
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          className='content-margin'
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          className="mt-4 content-margin"
        >
          Login
        </Button>
        <Typography className="text-center mt-4 content-margin">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </Typography>
      </form>
    </div>
  );
};

export default Login;