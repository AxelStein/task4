import PasswordReset from './password.reset.model.js';
import { Transaction } from 'sequelize';

const repository = {

    /**
     * @param {number} userId 
     * @param {Transaction|null} transaction 
     * @returns {Promise}
     */
    delete: (userId, transaction = null) => {
        return PasswordReset.destroy({ where: { userId }, transaction });

    },

    /**
     * @param {object} data 
     * @param {Transaction|null} transaction 
     * @returns {Promise}
     */
    create: (data, transaction = null) => {
        return PasswordReset.create(data, { transaction, raw: true });
    },

    /**
     * 
     * @param {string} token 
     * @param {Transaction|null} transaction 
     * @returns {Promise}
     */
    get: (token, transaction = null) => {
        return PasswordReset.findOne({ where: { token }, transaction, raw: true });
    }
}

export default repository;