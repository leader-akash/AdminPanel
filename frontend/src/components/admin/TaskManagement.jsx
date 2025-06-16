import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Button, TextField, Alert, Typography, Box, Pagination } from '@mui/material';

const TaskManagement = ({ setToken }) => {
  const [tasks, setTasks] = useState([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [page, setPage] = useState(1);
  const [pageInput, setPageInput] = useState('');
  const limit = 5;
  const [selectedTasks, setSelectedTasks] = useState(new Map());
  const [selectAll, setSelectAll] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { fetchTasks, updateTasksStatus, createDummyTasks } = useApi();

  const loadTasks = async () => {
    try {
      const data = await fetchTasks(page, limit);
      setTasks(data.tasks);
      setTotalTasks(data.total);
      setSelectAll(data.tasks.every((task) => selectedTasks.has(task._id.toString())));
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to load tasks');
    }
  };

  const handleSelectTask = (taskId) => {
    const newSelectedTasks = new Map(selectedTasks);
    if (newSelectedTasks.has(taskId)) {
      newSelectedTasks.delete(taskId);
    } else {
      newSelectedTasks.set(taskId, true);
    }
    setSelectedTasks(newSelectedTasks);
    setSelectAll(tasks.every((task) => newSelectedTasks.has(task._id.toString())));
  };

  const handleSelectAll = () => {
    const newSelectedTasks = new Map(selectedTasks);
    if (selectAll) {
      tasks.forEach((task) => newSelectedTasks.delete(task._id.toString()));
      setSelectAll(false);
    } else {
      tasks.forEach((task) => newSelectedTasks.set(task._id.toString(), true));
      setSelectAll(true);
    }
    setSelectedTasks(newSelectedTasks);
  };

  const handleUpdateTasksStatus = async (status) => {
    try {
      const taskIds = Array.from(selectedTasks.keys());
      if (taskIds.length === 0) {
        return setError('No tasks selected');
      }
      await updateTasksStatus(taskIds, status);
      setSelectedTasks(new Map());
      setSelectAll(false);
      loadTasks();
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to update tasks');
    }
  };

  const handleCreateDummyTasks = async () => {
    try {
      await createDummyTasks();
      loadTasks();
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to create dummy tasks');
    }
  };

  const handlePageInput = (e) => {
    const value = e.target.value;
    if (value === '' || (/^\d+$/.test(value) && parseInt(value) >= 1 && parseInt(value) <= Math.ceil(totalTasks / limit))) {
      setPageInput(value);
    }
  };

  const handlePageJump = () => {
    if (pageInput && parseInt(pageInput) !== page) {
      setPage(parseInt(pageInput));
    }
  };

  useEffect(() => {
    loadTasks();
  }, [page]);

  const totalPages = Math.ceil(totalTasks / limit);

  return (
    <Box className="container mx-auto p-4">
      <Typography variant="h5" className="mb-6">Task Management</Typography>
      {error && <Alert severity="error" className="mb-4">{error}</Alert>}
      <Box className="mb-4 flex space-x-4">
        <Button variant="contained" color="success" onClick={handleCreateDummyTasks}>
          Create Dummy Tasks
        </Button>
      </Box>
      <Typography>Selected Tasks: {selectedTasks.size}</Typography>
      {selectedTasks.size > 0 && (
        <Box className="mb-4 flex space-x-2">
          <Button variant="contained" color="primary" onClick={() => handleUpdateTasksStatus('pending')}>
            Set Pending
          </Button>
          <Button variant="contained" color="warning" onClick={() => handleUpdateTasksStatus('in_progress')}>
            Set In Progress
          </Button>
          <Button variant="contained" color="success" onClick={() => handleUpdateTasksStatus('completed')}>
            Set Completed
          </Button>
        </Box>
      )}
      <TableContainer component={Paper} className="shadow">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox checked={selectAll} onChange={handleSelectAll} />
              </TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created By</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task._id}>
                <TableCell>
                  <Checkbox
                    checked={selectedTasks.has(task._id.toString())}
                    onChange={() => handleSelectTask(task._id.toString())}
                  />
                </TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{task.createdBy.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className="mt-4 flex justify-between items-center">
        <Button
          variant="outlined"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>
        <Box className="flex items-center space-x-2">
          <Typography>Page {page} of {totalPages}</Typography>
          <TextField
            size="small"
            value={pageInput}
            onChange={handlePageInput}
            onBlur={handlePageJump}
            onKeyPress={(e) => e.key === 'Enter' && handlePageJump()}
            placeholder="Go to page"
            className="w-24"
          />
        </Box>
        <Button
          variant="outlined"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default TaskManagement;