import { Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import useApi from '../../hooks/useApi';

const PrivateRoute = ({ role }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');
  const { checkUserStatus } = useApi();

  useEffect(() => {
    const checkStatus = async () => {
      if (token) {
        try {
          await checkUserStatus();
        } catch (error) {
          console.error('Status check failed:', error);
        }
      }
    };
    checkStatus();
    const interval = setInterval(checkStatus, 300000); // Check every 5 minutes
    return () => clearInterval(interval);
  }, [token, checkUserStatus]);

  if (!token) return <Navigate to="/login" />;
  if (role && role !== userRole) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;