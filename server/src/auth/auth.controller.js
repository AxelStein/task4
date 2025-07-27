import express from 'express';
import passport from 'passport';
import authService from './auth.service.js';
import { UnauthorizedError } from '../error/index.js';

const initSession = (user, req, res, next) => {
    req.logIn(user, (err) => {
        if (err) {
            next(err);
        } else {
            res.send(user);
        }
    });
}

export default {

    /**
     * @param {express.Request} req 
     * @param {express.Response} res 
     */
    login: (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                next(err);
            } else if (!user) {
                next(new UnauthorizedError());
            } else {
                initSession(user, req, res, next);
            }
        })(req, res, next);
        // passport.authenticate('local', { successRedirect: '/dashboard', failWithError: true })(req, res, next);
    },

    /**
     * @param {express.Request} req 
     * @param {express.Response} res 
     */
    signup: async (req, res, next) => {
        const { name, email, password } = req.body;
        const user = await authService.signup(name, email, password);
        initSession(user, req, res, next);
    },

    /**
     * @param {express.Request} req 
     * @param {express.Response} res 
     */
    logout: (req, res, next) => {
        req.logOut((err) => {
            if (err) {
                next(err);
            } else {
                res.sendStatus(200);
            }
        });
    }
}