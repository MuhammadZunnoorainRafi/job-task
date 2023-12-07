import express from 'express';
import {
  createTaskController,
  deleteTaskController,
  getTaskController,
  updateTaskController,
} from '../controllers/taskController';
import { protect } from '../middlewares/authMiddleware';

const taskRoute = express.Router();

taskRoute.get('/get', protect, getTaskController);
taskRoute.post('/post', protect, createTaskController);
taskRoute.put('/put', protect, updateTaskController);
taskRoute.delete('/delete', protect, deleteTaskController);

export default taskRoute;
