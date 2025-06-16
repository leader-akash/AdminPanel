import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Button, TextField, Alert, Typography, Pagination } from '@mui/material';

const TaskManagement = ({ setToken }) => {
  const [tasks, setTasks] = useState([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [page, setPage] = useState(1);
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

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    loadTasks();
  }, [page]);

  const totalPages = Math.ceil(totalTasks / limit);

  return (
    <div className="container mx-auto p-4">
      <div className='flex justify-between py-4 flex-div'>
        <Typography variant="h5" className="mb-6">Task Management</Typography>
        <button onClick={() => navigate("/admin/users")}>Go To Users</button>
      </div>
      {error && <Alert severity="error" className="mb-4">{error}</Alert>}
      <div className="mb-4 flex space-x-4 py-4">
        <Button variant="contained" color="success" onClick={handleCreateDummyTasks}>
          Create Dummy Tasks
        </Button>
        {/* <Button variant="contained" color="secondary" onClick={handleSelectAll}>
          {selectAll ? 'Deselect All Tasks' : 'Select All Tasks'}
        </Button> */}
      </div>
      <Typography style={{margin: "1rem"}}>Selected Tasks: {selectedTasks.size}</Typography>
      {selectedTasks.size > 0 && (
        <div className="mb-4 flex space-x-2">
          <Button  style={{margin: '5px'}} variant="contained" color="primary" onClick={() => handleUpdateTasksStatus('pending')}>
            Set Pending
          </Button>
          <Button  style={{margin: '5px'}} variant="contained" color="warning" onClick={() => handleUpdateTasksStatus('in_progress')}>
            Set In Progress
          </Button>
          <Button  style={{margin: '5px'}} variant="contained" color="success" onClick={() => handleUpdateTasksStatus('completed')}>
            Set Completed
          </Button>
        </div>
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
      <div className="mt-4 flex justify-center">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          siblingCount={2}
          boundaryCount={2}
        />
      </div>
    </div>
  );
};

export default TaskManagement;