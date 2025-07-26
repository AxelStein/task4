import express from 'express';
import passport from 'passport';
import authService from './auth.service.js';

const controller = {

    /**
     * @param {express.Request} req 
     * @param {express.Response} res 
     */
    login: (req, res, next) => {
        passport.authenticate('local', { successRedirect: '/dashboard', failWithError: true })(req, res, next);
    },

    /**
     * @param {express.Request} req 
     * @param {express.Response} res 
     */
    signup: async (req, res, next) => {
        const { name, email, password } = req.body;
        const user = await authService.signup(name, email, password);
        req.logIn(user, (err) => {
            if (err) {
                next(err);
            } else {
                res.sendStatus(201);
            }
        });
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

export default controller;