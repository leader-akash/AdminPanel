import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../hooks/useApi';
import { toast } from 'react-toastify'; // Import toast
import { Button, Typography,  Alert } from '@mui/material';

const User = ({ setToken, setRole }) => {
  const navigate = useNavigate();
  const { getUserDetails } = useApi();
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken('');
    setRole('');
    navigate('/login');
  };

  const handleGetUserDetails = async () => {
    try {
      const data = await getUserDetails();
      setUserDetails(data);
      setError('');
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to fetch user details';
      if (error.response?.status === 401) {
        toast.error('Session expired. Logging out...'); // Token version mismatch
      } else if (error.response?.status === 403) {
        toast.error('Account is inactive. Logging out...'); // Inactive user
      } else {
        toast.error(errorMessage); // Other errors
      }
      setError(errorMessage);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Typography variant="h5" className="mb-4 content-margin">Welcome, User!</Typography>
      {error && <Alert severity="error" className="mb-4 content-margin">{error}</Alert>}
      {userDetails && (
        <div className="mb-4 content-margin">
          <Typography>Email: {userDetails.email}</Typography>
          <Typography>Status: {userDetails.status}</Typography>
          <Typography>Role: {userDetails.role}</Typography>
        </div>
      )}
      <div className="flex gap-4 content-margin">
        <Button className='margin-left' variant="contained" color="primary" onClick={handleGetUserDetails}>
          Get My Details
        </Button>
        <Button className='margin-left' variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default User;