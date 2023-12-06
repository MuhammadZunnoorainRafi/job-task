import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';

interface User {
  _id: Types.ObjectId;
  name: string;
  email: string;
}

export interface RequestWithUser extends Request {
  user?: User;
}

interface DecodeWithId {
  id: string;
}

export const protect = asyncHandler(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith('Bearer')) {
      try {
        token = authorization.split(' ')[1];
        const decode = jwt.verify(
          token,
          process.env.JWT_SECRET!
        ) as DecodeWithId;
        req.user = (await User.findById(decode.id).select('-password')) as User;
        next();
      } catch (error) {
        res.status(401);
        throw new Error('Not authorized');
      }
    }

    if (!token) {
      res.status(401);
      throw new Error('Token not found');
    }
  }
);
