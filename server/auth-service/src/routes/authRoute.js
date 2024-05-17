import express from 'express';
const Router = express.Router();

import authController from '../controllers/authController.js';
import authMiddleWare from '../middleware/authMiddleware.js'

Router.post('/register', authController.register);
Router.post('/login', authController.loginUser);
Router.post('/refresh-token', authMiddleWare.verifyTokenAdmin, authController.refreshToken);
Router.get('/test', authController.test);

export const AuthRoute = Router;
