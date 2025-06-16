import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Alert, Typography, Button } from '@mui/material';

const UserManagement = ({ setToken, setRole }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { fetchUsers, updateUserStatus } = useApi();

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to fetch users');
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateUserStatus(id, status);
      setUsers(users.map((user) => (user._id === id ? { ...user, status } : user)));
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to update status');
    }
  };


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken('');
    setRole('');
    navigate('/login');
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className='flex justify-between py-4 flex-div'>
        <Typography variant="h5" className="mb-6">User Management</Typography>
        <button onClick={() => navigate("/admin/tasks")}>Go To Tasks</button>
      </div>
      {error && <Alert severity="error" className="mb-4">{error}</Alert>}
      <TableContainer component={Paper} className="shadow">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  <Select
                    value={user.status}
                    onChange={(e) => handleUpdateStatus(user._id, e.target.value)}
                    size="small"
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

       <Button className='content-margin' variant="contained" color="error" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default UserManagement;