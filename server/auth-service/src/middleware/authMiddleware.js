import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authMiddleWare = {
    verifyToken: (req, res, next) => {
        const token = req.headers.authorization;
        if(!token){
            return res.status(StatusCodes.UNAUTHORIZED).json("You are not Authenticated");
        }
        const accessToken = token.split(' ')[1];
        jwt.verify(accessToken, process.env.ACCESS_TOKEN, async(err, user) => {
            if(err){
                return res.status(StatusCodes.FORBIDDEN).json("Token is not valid");
            }
            try {
                const response = await axios.post(`${process.env.AUTHORIZATION_URL}`, { accessToken });
                // console.log(response.data.payload)
                if(response.data.authorized){
                    // req.user từ user gửi req lên , user bên phải là của database;
                    req.user = user;
                    next();
                }
            } catch (error) {
                console.log('Authorization service error:', error);
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("Internal Server Error");
            }
        });
    },
    verifyCustomer: (req, res, next) => {
        authMiddleWare.verifyToken(req, res, () => {
            const { payload } = req.user;
            if(payload.role === 'customer' || payload.role === 'admin'){
                next();
            }else{
                return res.status(StatusCodes.UNAUTHORIZED).json("Please login to use it");
            }
        })
    },
    verifyTokenAdmin: (req, res, next) => {
        authMiddleWare.verifyToken(req, res, () => {
            const { payload } = req.user;
            if(payload.role === 'admin'){
                next();
            }else{
                return res.status(StatusCodes.UNAUTHORIZED).json("You are not allowed to do it");
            }
        })
    },
    allowGuestAccess: (req, res, next) => {
        const token = req.headers.token;
    
        // Kiểm tra xem có token không
        if (token) {
            const accessToken = token.split(' ')[1];
            jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, user) => {
                if(err){
                    return res.status(StatusCodes.FORBIDDEN).json("Token is not valid");
                } else {
                    req.user = user;
                    next();
                }
            });
        } else {
            // Nếu không có token, cho phép tiếp tục thực thi
            next();
        }
    }
}

export default authMiddleWare;
