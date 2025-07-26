import 'dotenv/config';
import express from 'express';
import apiRouterV1 from './src/api.router.v1.js';
import errorHandler from './src/middleware/error.handler.js';
import db from './src/db/index.js';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import { PassportLocalStrategy, passportUserSerializer, passportUserDeserializer } from './src/auth/auth.passport.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/v1', apiRouterV1);
app.use('/login', (req, res) => res.send("Login"));
app.use('/dashboard', (req, res) => res.send("Dashboard"));

app.use(errorHandler);

passport.use(PassportLocalStrategy);
passport.serializeUser(passportUserSerializer);
passport.deserializeUser(passportUserDeserializer);

const port = process.env.PORT;
const host = process.env.HOST;

db.sync()
    .then(() => {
        app.listen(port, host, () => {
            console.log(`Server running at http://${host}:${port}/`);
        });
    });