import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';
import { getUsers, updateUserStatus } from '../contollers/user.controller.js';

const router = express.Router();

router.get('/', protect, adminOnly, getUsers);
router.post('/update-status', protect, adminOnly, updateUserStatus);

export default router;