import { DataTypes, Model } from "sequelize";

export class UserModel extends Model {
    declare id: number;
    declare name: string;
    declare email: string;
    declare password: string;
}

UserModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    sequelize: require('../utils/db').default,
    tableName: 'users',
    timestamps: true,
    underscored: true
});