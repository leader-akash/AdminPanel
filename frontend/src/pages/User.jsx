import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';

const User = ({ setToken, setRole }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken('');
    setRole('');
    navigate('/login');
  };

  return (
    <Box className="container mx-auto p-4">
      <Typography variant="h5" className="mb-4">Welcome, User!</Typography>
      <Button variant="contained" color="error" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default User;