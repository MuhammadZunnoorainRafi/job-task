import { Response, Request } from 'express';
import asyncHandler from 'express-async-handler';
import { Task } from '../models/taskModel';
import { RequestWithUser } from '../middlewares/authMiddleware';
import { taskUpdateValidation, taskValidation } from '../utils/validations';
import { fromZodError } from 'zod-validation-error';

// @desc get task
// @route /api/task/get
// @access Private
export const getTaskController = asyncHandler(
  async (req: RequestWithUser, res: Response) => {
    const allTasks = await Task.find({ userId: req.user?._id });
    res.status(200).json(allTasks);

    if (!allTasks) {
      res.status(400);
      throw new Error('Tasks not found');
    }
  }
);

// @disc Create task
// @route /api/task/post
// @access Private
export const createTaskController = asyncHandler(
  async (req: RequestWithUser, res: Response) => {
    const validation = taskValidation.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json(fromZodError(validation.error));
      return;
    }
    const { title, description, priority } = validation.data;

    const newTask = await Task.create({
      userId: req.user?._id,
      title,
      description,
      priority,
    });

    if (newTask) {
      res.status(201).json({
        id: newTask._id,
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority,
        createdAt: newTask.createdAt,
        updatedAt: newTask.updatedAt,
      });
    } else {
      res.status(400).json({
        message: 'Task not created',
      });
    }
  }
);

// @desc Update task
// @route /api/task/put
// @access Private

export const updateTaskController = asyncHandler(
  async (req: Request, res: Response) => {
    const validation = taskUpdateValidation.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json(fromZodError(validation.error));
      return;
    }
    const { title, description, id, priority } = validation.data;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, priority },
      { new: true }
    );

    if (updatedTask) {
      res.status(201).json({
        message: 'Updated',
      });
    } else {
      res.status(401);
      throw new Error('Not Updated');
    }
  }
);

// @desc delete task
// @route /api/task/delete
// @access Private
export const deleteTaskController = asyncHandler(
  async (req: RequestWithUser, res: Response) => {
    const { id } = req.body;
    if (!id) {
      res.status(400).json({
        message: 'ID not found',
      });
    }
    const taskDeleted = await Task.findByIdAndDelete(id);
    if (taskDeleted) {
      res.status(200).json({
        message: 'Deleted',
      });
    } else {
      res.status(400).json({
        message: 'Error while deleting task',
      });
    }
  }
);
