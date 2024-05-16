import express from 'express';
const Router = express.Router();

import authController from '../controllers/authController.js';
import authMiddleWare from '../middleware/authMiddleware.js'

Router.get('/get-all-user', authMiddleWare.verifyTokenAdmin, authController.getAllUser);
Router.get('/get-detail-user', authMiddleWare.verifyTokenAdmin, authController.getDetailUser);
Router.post('/add-new-user', authMiddleWare.verifyTokenAdmin, authController.addNewUser);
Router.patch('/update-user', authMiddleWare.verifyTokenAdmin, authController.updateUser);
Router.delete('/delete-user', authMiddleWare.verifyTokenAdmin, authController.deleteUser);

export const AuthRoute = Router;
