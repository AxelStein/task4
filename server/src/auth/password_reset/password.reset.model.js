import { DataTypes, Model } from 'sequelize';
import db from '../../db/index.js';
import User from '../../user/user.model.js';

class PasswordReset extends Model {}

PasswordReset.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        token: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
    {
        sequelize: db,
        modelName: "PasswordReset",
        tableName: "password_resets"
    }
);

User.hasOne(PasswordReset, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
PasswordReset.belongsTo(User, {
    foreignKey: 'userId'
});

export default PasswordReset;