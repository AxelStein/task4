import { UnauthorizedError } from "../error/index.js";
import User from "../user/user.model.js";
import userService from "../user/user.service.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
    }
}

export default service;