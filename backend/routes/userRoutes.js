import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';
import { getUserDetails, getUsers, updateUserStatus } from '../contollers/user.controller.js';

const router = express.Router();

router.get('/', protect, adminOnly, getUsers);
router.post('/update-status', protect, adminOnly, updateUserStatus);
router.get('/user-detail', protect, getUserDetails)

export default router;