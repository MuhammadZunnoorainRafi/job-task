import express from 'express';
import {
  signInController,
  signUpController,
} from '../controllers/authController';

const authRoute = express.Router();

authRoute.post('/signUp', signUpController);
authRoute.post('/signIn', signInController);

export default authRoute;
