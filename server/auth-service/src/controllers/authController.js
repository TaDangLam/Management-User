import { StatusCodes } from 'http-status-codes';

import authService from "../service/authService.js";
import middlewareToken from '../service/jwtService.js';


const authController = {
    test: async(req, res) => {
        try {
            res.status(StatusCodes.OK).json('OKEEEE');
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    register: async(req, res) => {
        try {
           const { username, fullname, password, confirmps, email, phone } = req.body;
            const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
            const checkMail = regex.test(email);
            if(!username || !email || !password || !phone || !fullname){
                return res.status(StatusCodes.BAD_REQUEST).json({error: 'Please complete all information'});
            } else if (!checkMail) {
                return res.status(StatusCodes.BAD_REQUEST).json({error: 'Email is not valid'})
            } else if (password !== confirmps) {
                return res.status(StatusCodes.BAD_REQUEST).json({error: 'Password and confirmPassword is not match'})
            }
            const response = await authService.register(req.body);
            res.status(StatusCodes.CREATED).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    loginUser: async(req, res) => {
        try {
            const { username, password } = req.body;
            console.log(req.body)
            if( !username || !password ){
                return res.status(StatusCodes.BAD_REQUEST).json({error: 'Please complete all information'});
            }
            const response = await authService.login(req.body);
            res.status(StatusCodes.ACCEPTED).json(response);
         } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
         }
    },
    refreshToken: async(req, res) => {
        try {
            const token = req.headers.token;
            if(!token) {
                return res.status(StatusCodes.BAD_REQUEST).josn({message: 'The Token is required'});
            }
            const response = await middlewareToken.refreshTokenService(token);
            return res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    forgotPassword: async(req, res) => {
        try {
            
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }
}

export default authController;
