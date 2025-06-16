import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  tokenVersion: { type: Number, default: 0 },
});

export default mongoose.model('User', userSchema);  