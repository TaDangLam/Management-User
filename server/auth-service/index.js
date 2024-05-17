import express from 'express';
const app = express();
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import MongoConnect from './src/lib/mongodb.js';
import routes from './src/routes/index.js';

dotenv.config();
const PORT = process.env.PORT || 4001;  // PORT = 8001

// Middleware
app.use(cors());
// app.use(bodyParser.json())
app.use(express.json());
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Connect Database
MongoConnect();

//route
routes(app)


app.listen(PORT, () => console.log(`Server listening http://localhost:${PORT}`));
