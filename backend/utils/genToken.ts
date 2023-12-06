import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
export const genToken = (id: Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: '10 days',
  });
};
