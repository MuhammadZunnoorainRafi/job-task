import mongoose, { Document, Model, Schema, Types } from 'mongoose';

interface ITask extends Document {
  userId: Types.ObjectId | undefined;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new mongoose.Schema<ITask>(
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

export const Task = mongoose.model<ITask>('Task', taskSchema);
