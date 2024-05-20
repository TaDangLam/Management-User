import express from 'express';
const app = express();
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import { Authorization } from './src/routes/authorizationRoute.js';

dotenv.config();
const PORT = process.env.PORT ; //PORT = 8002

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use('/api/authorization', Authorization)

app.listen(PORT, () => console.log(`Server listening http://localhost:${PORT}`));