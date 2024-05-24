import { StatusCodes } from 'http-status-codes';

import authService from "../service/authService.js";
import middlewareToken from '../service/jwtService.js';

const authController = {
    register: async(req, res) => {
        try {
            const { username, fullname, password, confirmps, email, phone, sex, dateOfBirth } = req.body;
            const regexMail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
            const regexPhoneNumber = /^(\+84|84|0)(3|5|7|8|9|1[2|6|8|9])[0-9]{8}$/;
            const checkMail = regexMail.test(email);
            const checkPhone = regexPhoneNumber.test(phone);

            if(!username){
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please enter field username' });
            } else if (!fullname) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please enter field Fullname' });
            } else if (!password) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please enter field Password' });
            } else if (!confirmps) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please enter the password confirmation field as above' });
            } else if (!email) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please enter field Email' });
            } else if (!phone) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please enter field Phone' });
            } else if (!sex) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please select Sex' });
            } else if (!dateOfBirth) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please select birth' });
            } else if (!checkMail) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Email is not valid' });
            } else if (!checkPhone) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Phone is not valid' });
            } else if (password !== confirmps) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Password and confirmPassword is not match' });
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
            if( !username || !password ){
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please complete all information' });
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
                return res.status(StatusCodes.BAD_REQUEST).json({ message: 'The Token is required' });
            }
            const response = await middlewareToken.refreshTokenService(token);
            return res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    getAllUser: async(req, res) => {
        try {
            const response = await authService.getAllUser();
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    addUser: async(req, res) => {
        try {
            const response = await authService.addUser();
            res.status(StatusCodes.CREATED).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    deleteUser: async(req, res) => {
        try {
            const { id } = req.params;
            if(!id){
                return res.status(StatusCodes.NOT_FOUND).json('The user is not required')
            }
            const response = await authService.deleteUser(id);
            res.status(StatusCodes.OK).json(response)
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    getDetailUser: async(req, res) => {
        try {
            const { id } = req.params;
            if(!id){
                return res.status(StatusCodes.NOT_FOUND).json('The user is not required')
            }
            const response = await authService.getDetailUser(id);
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    updateUser: async(req, res) => {
        try {
            const { id } = req.params;
            const { username, fullname, password, confirmps, phone, email, accountStatus, dateOfBirth } = req.body;
            const data = { username, fullname, password, confirmps, phone, email, accountStatus, dateOfBirth }
            
            if (req.file) {
                data.avatar = req.file.originalname;
            }
            if(!id){
                return res.status(StatusCodes.NOT_FOUND).json('The user is not required')
            }
            const response = await authService.updateUser(id, data);
            res.status(StatusCodes.OK).json(response);
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
