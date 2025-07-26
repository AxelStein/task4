import { UnauthorizedError } from "../error/index.js";
import userService from "../user/user.service.js";
import bcrypt from 'bcrypt';

export default {

    login: async (email, password) => {
        const user = await userService.getByEmail(email);
        if (!user || !await bcrypt.compare(password, user.password) || user.isBlocked) {
            throw new UnauthorizedError('Invalid credentials');
        }
        delete user.password;
        return user;
    },

    signup: async (name, email, password) => {
        return userService.createUser(name, email, await bcrypt.hash(password, 10));
    }
}