import mongoose, { Types } from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model('Task', taskSchema);
