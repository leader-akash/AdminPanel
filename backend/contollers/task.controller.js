import Task from '../models/Task.model.js';
import User from '../models/User.model.js';

export const createDummyTasks = async (req, res) => {
  try {
    const user = await User.findOne({ role: 'user' });
    if (!user) {
      return res.status(404).json({ error: 'No user found to assign tasks' });
    }
    const tasks = Array.from({ length: 20 }, (_, i) => ({
      title: `Task ${i + 1}`,
      description: `Description for Task ${i + 1}`,
      createdBy: user._id,
    }));
    await Task.insertMany(tasks);
    res.status(201).json({ message: ' Dummy tasks created' });
  } catch (error) {
    console.log('errr', error)
    res.status(400).json({ error: error.message });
  }
};

export const getTasks = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  try {
    const tasks = await Task.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('createdBy', 'email');
    const total = await Task.countDocuments();
    res.json({ tasks, total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTasksStatus = async (req, res) => {
  const { taskIds, status } = req.body;
  try {
    await Task.updateMany({ _id: { $in: taskIds } }, { status });
    res.json({ message: 'Tasks updated' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};