import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken';
import express from  'express';
const Router = express.Router();


Router.post('/check-token', (req, res) => {
    const { accessToken } = req.body
    jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(StatusCodes.FORBIDDEN).json({ authorized: false });
        } else {
            return res.status(StatusCodes.OK).json({ authorized: true, payload: decoded });
        }
    });
});


export const Authorization = Router;
