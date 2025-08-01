import { ApiError, UnauthorizedError } from "../error/index.js";
import User from "../user/user.model.js";
import userService from "../user/user.service.js";
import userRepository from '../user/user.repository.js';
import passwordResetRepository from './password_reset/password.reset.repository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db/index.js';
import crypto from 'crypto';
import emailService from './email.service.js';

const passwordResetExpireTime = 3600000;

/**
 * 
 * @param {User} user 
 * @returns {Promise<any>}
 */
const createToken = (user) => new Promise((resolve, reject) => {
    jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { algorithm: 'HS256', expiresIn: '1h' },
        (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve({
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        isBlocked: user.isBlocked,
                        lastSeen: user.lastSeen,
                    },
                    token
                });
            }
        }
    );
});

const service = {

    /**
     * @param {string} email 
     * @param {string} password 
     * @returns {Promise<any>}
     */
    login: async (email, password) => {
        const user = await userService.getByEmail(email);
        if (!user || !await bcrypt.compare(password, user.password) || user.isBlocked) {
            throw new UnauthorizedError('Invalid credentials');
        }
        return createToken(user);
    },

    /**
     * 
     * @param {string} name 
     * @param {string} email 
     * @param {string} password 
     * @returns {Promise<any>}
     */
    signup: async (name, email, password) => {
        return createToken(await userService.createUser(name, email, await bcrypt.hash(password, 10)));
    },

    /**
     * @param {string} email 
     * @returns {Promise<any>}
     */
    resetPassword: (email) => {
        return db.transaction(async (transaction) => {
            const user = await userRepository.getByEmail(email, transaction);
            if (!user) {
                return;
            }

            await passwordResetRepository.delete(user.id, transaction);

            const passwordReset = {
                userId: user.id,
                token: crypto.randomBytes(32).toString('hex'),
                expiresAt: new Date(Date.now() + passwordResetExpireTime)
            };

            await passwordResetRepository.create(passwordReset, transaction);

            await emailService.sendRestorePasswordEmail(email, passwordReset.token);
        });
    },

    /**
     * @param {string} token 
     * @param {string} password 
     * @returns {Promise}
     */
    restorePassword: async (token, password) => {
        return db.transaction(async (transaction) => {
            const data = await passwordResetRepository.get(token, transaction);
            if (!data || data.expiresAt < new Date()) {
                if (data) {
                    await passwordResetRepository.delete(data.userId);
                }
                throw new ApiError('Password restore requrest has expired', 410);
            }
            
            await userRepository.updateUserPassword(data.userId, await bcrypt.hash(password, 10), transaction);

            await passwordResetRepository.delete(data.userId, transaction);
        });
    }
}

export default service;