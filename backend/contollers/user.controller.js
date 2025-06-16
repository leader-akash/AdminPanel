import User from '../models/User.model.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUserStatus = async (req, res) => {
  const { id, status } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.status = status;
    user.tokenVersion += 1; // Increment token version to invalidate existing tokens
    await user.save();
    res.json({ message: 'User status updated' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};