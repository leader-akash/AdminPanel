import User from '../models/User.model.js';

export const getUsers = async (req, res) => {
   try {
    const users = await User.find({ role: { $ne: 'admin' } }).select('-password');
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
    user.tokenVersion += 1; 
    await user.save();
    res.json({ message: 'User status updated' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('email status role');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (user.status === 'inactive') {
      return res.status(403).json({ error: 'User is inactive' });
    }
    res.json({ email: user.email, status: user.status, role: user.role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};