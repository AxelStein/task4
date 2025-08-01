import User from './user.model.js';
import { Op } from 'sequelize';
import db from '../db/index.js';
import { Transaction } from 'sequelize';
import { ApiError } from '../error/index.js';

const doOnUsers = (ids, action) => new Promise((resolve, reject) => {
    db.transaction(async (transaction) => {
        const count = await User.count({ where: { id: { [Op.in]: ids } }, transaction });
        if (count !== ids.length) {
            throw new ApiError("Data inconsistency detected", 410);
        } else {
            await action(transaction);
        }
    }).then(() => resolve()).catch(e => reject(e));
});

const repository = {
    /**
     * @param {string} name 
     * @param {string} email 
     * @param {string} password 
     * @returns {Promise<User>}
     */
    createUser(name, email, password) {
        return User.create({ name, email, password }, { raw: true });
    },

    /**
     * @param {string} sortBy
     * @param {boolean} sortAsc
     * @returns {Promise<Array<User>>}
     */
    getUsers(sortBy, sortAsc) {
        return User.findAll({ order: [[sortBy, sortAsc ? 'ASC' : 'DESC']], raw: true });
    },

    /**
     * 
     * @param {Number} id
     * @returns {Promise<User>}
     */
    getNotBlockedUserById(id) {
        return User.findOne({ where: { id, isBlocked: false }, raw: true });
    },

    /**
     * @param {Number} id 
     * @returns {Promise}
     */
    updateUserLastSeenDate(id) {
        return User.update({ lastSeen: new Date() }, { where: { id } });
    },

    /**
     * 
     * @param {string} email 
     * @param {Transaction|null} transaction
     * @returns {Promise<User>}
     */
    getByEmail(email, transaction = null) {
        return User.findOne({
            attributes: { include: ['password'] },
            where: { email },
            raw: true,
            transaction
        });
    },

    /**
     * @param {Array<Number>} ids
     * @param {boolean} isBlocked
     * @returns {Promise}
     */
    blockByIds(ids, isBlocked) {
        return doOnUsers(ids, async (transaction) => {
            return User.update({ isBlocked }, { where: { id: { [Op.in]: ids } }, transaction });
        });
    },

    /**
     * @param {Array<Number>} ids
     * @returns {Promise}
     */
    deleteByIds(ids) {
        return doOnUsers(ids, async (transaction) => {
            return User.destroy({ where: { id: { [Op.in]: ids } }, transaction });
        });
    },

    /**
     * 
     * @param {number} userId 
     * @param {string} password 
     * @param {Transaction|null} transaction 
     * @returns {Promise}
     */
    updateUserPassword: (userId, password, transaction = null) => {
        return User.update({ password }, { where: { id: userId }, transaction });
    }
}

export default repository;