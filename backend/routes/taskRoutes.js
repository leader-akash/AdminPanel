import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';
import { createDummyTasks, getTasks, updateTasksStatus } from '../contollers/task.controller.js';

const router = express.Router();

router.post('/dummy', protect, adminOnly, createDummyTasks);
router.get('/', protect, adminOnly, getTasks);
router.post('/update-status', protect, adminOnly, updateTasksStatus);

export default router;