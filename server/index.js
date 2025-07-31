import 'dotenv/config';
import express from 'express';
import apiRouterV1 from './src/api.router.v1.js';
import errorHandler from './src/middleware/error.handler.js';
import db from './src/db/index.js';
import passport from 'passport';
import cors from 'cors';
import { createPassportJwtStrategy } from './src/auth/auth.passport.js';
import cookieParser from 'cookie-parser';
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
/*
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
*/
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(cookieParser());
app.use(passport.initialize());
app.use('/api/v1', apiRouterV1);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});
app.use(errorHandler);

passport.use(createPassportJwtStrategy());

const port = process.env.PORT;
const host = process.env.HOST;

db.sync()
    .then(() => {
        app.listen(port, host, () => {
            console.log(`Server running at http://${host}:${port}/`);
        });
    });