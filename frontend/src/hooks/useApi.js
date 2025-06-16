import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCallback } from 'react';

const useApi = () => {
  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
      }
      return Promise.reject(error);
    }
  );

  const login = useCallback(async (email, password) => {
    const { data } = await axiosInstance.post('/auth/login', { email, password });
    return data;
  }, []);

  const register = useCallback(async (email, password) => {
    await axiosInstance.post('/auth/register', { email, password });
  }, []);

  const fetchUsers = useCallback(async () => {
    const { data } = await axiosInstance.get('/users');
    return data;
  }, []);

  const updateUserStatus = useCallback(async (id, status) => {
    await axiosInstance.post('/users/update-status', { id, status });
  }, []);

  const fetchTasks = useCallback(async (page, limit) => {
    const { data } = await axiosInstance.get(`/tasks?page=${page}&limit=${limit}`);
    return data;
  }, []);

  const updateTasksStatus = useCallback(async (taskIds, status) => {
    await axiosInstance.post('/tasks/update-status', { taskIds, status });
  }, []);

  const createDummyTasks = useCallback(async () => {
    await axiosInstance.post('/tasks/dummy');
  }, []);

const getUserDetails = useCallback(async () => {
    const { data } = await axiosInstance.get('/users/user-detail');
    return data;
  }, []);

  return {
    login,
    register,
    fetchUsers,
    updateUserStatus,
    fetchTasks,
    updateTasksStatus,
    createDummyTasks,
    getUserDetails,
  };
};

export default useApi;