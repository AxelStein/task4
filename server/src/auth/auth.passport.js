import { Strategy as LocalStrategy } from "passport-local";
import userService from '../user/user.service.js';
import authService from "./auth.service.js";

export const PassportLocalStrategy = new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
        authService.login(email, password)
            .then(user => done(null, user))
            .catch(err => done(err, null));
    }
);

export const passportUserSerializer = (user, done) => {
    done(null, user.id);
};

export const passportUserDeserializer = async (id, done) => {
    userService.getNotBlockedUserById(id)
        .then(user => done(null, user))
        .catch(err => done(err, null));
};