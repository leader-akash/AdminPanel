import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import { TextField, Button, Alert, Typography } from '@mui/material';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <Typography variant="h5" className="text-center mb-4 content-margin">Register</Typography>
      {error && <Alert severity="error" className="mb-4 content-margin">{error}</Alert>}
      <form onSubmit={handleSubmit} className="space-y-4 content-margin">
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
          Register
        </Button>
        <Typography className="text-center mt-4 content-margin">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </Typography>
      </form>
    </div>
  );
};

export default Register;