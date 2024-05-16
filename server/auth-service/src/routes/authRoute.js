import express from 'express';
const Router = express.Router();

import authController from '../controllers/authController.js';
import authMiddleWare from '../middleware/authMiddleware.js'

Router.post('/register', authMiddleWare.verifyTokenAdmin, authController.register);
Router.post('/login', authMiddleWare.verifyTokenAdmin, authController.loginUser);
Router.post('/refresh-token', authMiddleWare.verifyTokenAdmin, authController.refreshToken);


export const AuthRoute = Router;
