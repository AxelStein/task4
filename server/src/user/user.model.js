import { DataTypes, Model } from 'sequelize';
import db from '../db/index.js';

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isBlocked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        lastSeen: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize: db,
        modelName: "User",
        tableName: "users",
        defaultScope: {
            attributes: {
                exclude: [
                    'createdAt',
                    'updatedAt',
                    'password'
                ]
            }
        }
    }
);

export default User;