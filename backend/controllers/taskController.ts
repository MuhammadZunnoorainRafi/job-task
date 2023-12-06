import { Response, Request } from 'express';
import asyncHandler from 'express-async-handler';

// @desc get task
// @route /api/task/get
// @access Public
export const getTaskController = asyncHandler(
  async (req: Request, res: Response) => {}
);
