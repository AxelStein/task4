import User from './user.model.js';
import userRepository from './user.repository.js';

export default {

    /**
     * @param {string} name 
     * @param {string} email 
     * @param {string} password 
     * @returns {Promise<User>}
     */
    createUser(name, email, password) {
        return userRepository.createUser(name, email, password);
    },

    /**
     * @param {string} sortBy
     * @param {boolean} sortAsc
     * @returns {Promise<Array<User>>}
     */
    getUsers(sortBy = 'lastSeen', sortAsc = false) {
        console.log(`sortBy=${sortBy} sortAsc=${sortAsc}`);
        return userRepository.getUsers(sortBy, sortAsc);
    },

    /**
     * 
     * @param {string} email 
     * @returns {Promise<User>}
     */
    getByEmail(email) {
        return userRepository.getByEmail(email);
    },

    /**
     * 
     * @param {Number} id 
     * @returns {Promise<User>}
     */
    getNotBlockedUserById(id) {
        return userRepository.getNotBlockedUserById(id);
    },

    /**
     * @param {Array<Number>} ids
     * @param {boolean} blocked
     * @returns {Promise<boolean>}
     */
    blockByIds(ids, blocked) {
        return userRepository.blockByIds(ids, blocked);
    },

    /**
     * @param {Array<Number>} ids
     * @param {boolean} blocked
     * @returns {Promise<boolean>}
     */
    deleteByIds(ids) {
       return userRepository.deleteByIds(ids);
    }
}