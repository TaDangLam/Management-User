import express from 'express';
const Router = express.Router();

import authController from '../controllers/authController.js';
import authMiddleWare from '../middleware/authMiddleware.js'
import upload from '../configs/multerConfig.js';

Router.get('/get-all-user', authMiddleWare.verifyTokenAdmin, authController.getAllUser);
Router.post('/register', upload, authController.register);
Router.post('/login', upload, authController.loginUser);
Router.post('/add-multi-user', upload, authMiddleWare.verifyTokenAdmin, authController.addMultiUser)
Router.delete('/delete-user/:id', authMiddleWare.verifyTokenAdmin, authController.deleteUser);
Router.get('/get-detail-user/:id', authMiddleWare.verifyCustomer, authController.getDetailUser);
Router.patch('/update-user/:id', authMiddleWare.verifyCustomer, upload, authController.updateUser);
Router.patch('/update-status-to-active/:id', authMiddleWare.verifyTokenAdmin, upload, authController.updateStatusToActive);
Router.patch('/update-status-to-deleted/:id', authMiddleWare.verifyTokenAdmin, upload, authController.updateStatusToDeleted);
Router.patch('/delete-multi-user', authMiddleWare.verifyTokenAdmin, upload, authController.deleteMultiUser);
Router.patch('/update-status-to-inactive/:id', authMiddleWare.verifyTokenAdmin, upload, authController.updateStatusToInactive);

export const AuthRoute = Router;
