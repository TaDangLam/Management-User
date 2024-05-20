import express from 'express';
const Router = express.Router();

import authController from '../controllers/authController.js';
import authMiddleWare from '../middleware/authMiddleware.js'

Router.get('/get-all-user', authMiddleWare.verifyTokenAdmin, authController.getAllUser);
Router.post('/add-user', authMiddleWare.verifyTokenAdmin, authController.addUser);
Router.post('/register', authController.register);
Router.post('/login', authController.loginUser);
Router.delete('/delete-user/:id', authMiddleWare.verifyTokenAdmin, authController.deleteUser);
Router.get('/get-detail-user/:id', authMiddleWare.verifyTokenAdmin, authController.getDetailUser);
Router.patch('/update-user/:id', authMiddleWare.verifyTokenAdmin, authController.updateUser);

export const AuthRoute = Router;
