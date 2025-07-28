import 'dotenv/config';
import express from 'express';
import apiRouterV1 from './src/api.router.v1.js';
import errorHandler from './src/middleware/error.handler.js';
import db from './src/db/index.js';
import passport from 'passport';
// import session from 'express-session';
import cors from 'cors';
import { createPassportJwtStrategy } from './src/auth/auth.passport.js';

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
/*
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
}));
*/
app.use(passport.initialize());
app.use('/api/v1', apiRouterV1);
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