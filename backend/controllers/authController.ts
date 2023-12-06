import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { signInValidation, signUpValidation } from '../utils/validations';
import { fromZodError } from 'zod-validation-error';
import bcrypt from 'bcrypt';
import { genToken } from '../utils/genToken';
import { User } from '../models/userModel';

// @desc SignUp
// @route /api/auth/signUp
// @access Public
export const signUpController = asyncHandler(
  async (req: Request, res: Response) => {
    const validation = signUpValidation.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json(fromZodError(validation.error));
      return;
    }

    const { name, email, password } = validation.data;

    const userExist = await User.findOne({
      email,
    });
    if (userExist) {
      res.status(400);
      throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      res.status(201).json({
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        token: genToken(newUser._id),
      });
    } else {
      res.status(400).json({
        message: 'User not created',
      });
    }
  }
);

// @desc SignIn
// @route /api/auth/signIn
// @access Public
export const signInController = asyncHandler(
  async (req: Request, res: Response) => {
    const validations = signInValidation.safeParse(req.body);
    if (!validations.success) {
      res.status(400).json(fromZodError(validations.error));
      return;
    }

    const { email, password } = validations.data;

    const userExist = await User.findOne({ email });

    if (userExist && (await bcrypt.compare(password, userExist.password))) {
      res.status(200).json({
        id: userExist._id,
        name: userExist.name,
        email: userExist.email,
        token: genToken(userExist._id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid credentials');
    }
  }
);
