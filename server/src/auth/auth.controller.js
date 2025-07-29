import express from 'express';
import authService from './auth.service.js';

/**
 * @param {express.Response} res 
 * @param {object} data
 */
const setCookieToken = (res, data) => {
    res.cookie('token', data.token, { httpOnly: true, secure: false, sameSite: 'lax', maxAge: 3600000 });
    res.sendStatus(200);
}

const controller = {
    /**
     * @param {express.Request} req 
     * @param {express.Response} res 
     */
    signIn: async (req, res) => {
        const { email, password } = req.body;
        setCookieToken(res, await authService.login(email, password));
    },

    /**
     * @param {express.Request} req 
     * @param {express.Response} res 
     */
    signUp: async (req, res) => {
        const { name, email, password } = req.body;
        setCookieToken(res, await authService.signup(name, email, password));
    },
}

export default controller;