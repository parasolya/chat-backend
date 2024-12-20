import express from 'express';
import userSchemas from '../schemas/userSchemas.js';
import validateBody from '../decorators/validateBody.js';
import authController from '../controllers/authController.js';

const authRoutes = express.Router();

authRoutes.post('/signup', validateBody(userSchemas.userSignupSchema), authController.signup);
authRoutes.post('/signin', validateBody(userSchemas.userSigninSchema), authController.signin)


export default authRoutes;