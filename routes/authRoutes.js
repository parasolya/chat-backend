import express from 'express';
import * as userSchemas from '../models/userModel.js';
import validateBody from '../decorators/validateBody.js';
import authController from '../controllers/authController.js';

const authRoutes = express.Router();

authRoutes.post('/signup', validateBody(userSchemas.userSignupSchema), authController.signup)


export default authRoutes;