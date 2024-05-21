import express from 'express';
const Router = express.Router();

import authController from '../controllers/authController.js';
import authMiddleWare from '../middleware/authMiddleware.js'
import upload from '../configs/multerConfig.js';

Router.get('/get-all-user', authMiddleWare.verifyTokenAdmin, authController.getAllUser);
Router.post('/add-user', authMiddleWare.verifyTokenAdmin, authController.addUser);
Router.post('/register', upload, authController.register);
Router.post('/login', upload, authController.loginUser);
Router.delete('/delete-user/:id', authMiddleWare.verifyTokenAdmin, authController.deleteUser);
Router.get('/get-detail-user/:id', authMiddleWare.verifyCustomer, authController.getDetailUser);
Router.patch('/update-user/:id', authMiddleWare.verifyCustomer, upload, authController.updateUser);

export const AuthRoute = Router;
