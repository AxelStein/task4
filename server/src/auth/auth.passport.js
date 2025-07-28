import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import userService from '../user/user.service.js';

/**
 * @returns {JwtStrategy}
 */
export function createPassportJwtStrategy() {
    return new JwtStrategy({
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }, async (payload, done) => {
        userService.getNotBlockedUserById(payload.id)
            .then(user => done(null, user))
            .catch(e => done(e, null))
    });
}