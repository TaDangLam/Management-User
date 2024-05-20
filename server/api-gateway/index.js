import express from 'express';
const app = express();
import cors from 'cors';
import dotenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config();
const PORT = process.env.PORT || 4000;   // PORT = 8000

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("./public"));

// Proxy route cho auth-service 
app.use('/auth-service', createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/auth-service': ''
    },
    onError: (err, req, res) => {
        console.error('Proxy Auth Error:', err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
}));


// const proxyAuthMiddleware = (req, res, next) => {
//     // In ra thông tin yêu cầu trước khi chuyển tiếp
//     console.log('Incoming request to /auth-service:', req.method, req.url, req.body);

//     // Chuyển tiếp yêu cầu đến auth-service
//     createProxyMiddleware({
//         target: process.env.AUTH_SERVICE_URL,
//         changeOrigin: true,
//         onError: (err, req, res) => {
//             console.error('Proxy Auth Error:', err);
//             res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
//         }
//     })(req, res, (err) => {
//         if (err) {
//             console.error('Error forwarding request to auth-service:', err);
//             return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
//         }
//         // In ra thông tin phản hồi sau khi nhận được từ auth-service
//         console.log('Response from auth-service:', res.statusCode, res.body);
//         next(); // Chuyển tiếp cho các middleware tiếp theo nếu có
//     });
// };

// app.use('/auth-service', proxyAuthMiddleware);



// -----------------------------------------------------------------------------------
// // Proxy route cho auth-service 
app.use('/authorization-service', createProxyMiddleware({
    target: process.env.AUTHORIZATION_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/authorization-service': ''
    },
    onError: (err, req, res) => {
        console.error('Proxy Authorization Error:', err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
}));


app.listen(PORT, () => console.log(`API Gateway is running on http://localhost:${PORT}`));