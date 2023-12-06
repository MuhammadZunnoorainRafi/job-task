import express from 'express';
import { signUpController } from '../controllers/authController';

const authRoute = express.Router();

authRoute.post('/signUp', signUpController);
authRoute.post('/signIn');

export default authRoute;
