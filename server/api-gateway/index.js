import express from 'express';
const app = express();
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import proxy from 'express-http-proxy';
// import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config();
const PORT = process.env.PORT || 4000;   // PORT = 4000

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/auth', proxy(process.env.AUTH_SERVICE_URL));
app.use('/api/user', proxy(process.env.USER_SERVICE_URL));
// // Proxy route cho auth-service 
// app.use('/api/auth', createProxyMiddleware({
//     target: process.env.AUTH_SERVICE_URL,
//     changeOrigin: true,
//     pathRewrite: {
//         '^/api/auth': '/api/auth',
//     },
//     onError: (err, req, res) => {
//         console.error('Proxy Error:', err);
//         res.status(500).send('Proxy Error');
//     }
// }));

// // Proxy route cho user-service
// app.use('/api/user', createProxyMiddleware({
//     target: process.env.USER_SERVICE_URL,
//     changeOrigin: true,
//     pathRewrite: {
//         '^/api/user': '/api/user',
//     }
// }));

app.listen(PORT, () => console.log(`API Gateway is running on http://localhost:${PORT}`));