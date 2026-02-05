import { DataTypes, Model } from "sequelize";

export class UserModel extends Model {
    declare id: number;
    declare name: string;
    declare email: string;
    declare password: string | null;
    declare googleId: string | null;
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
        allowNull: true
    },
    googleId: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
        field: 'google_id'
    }
}, {
    sequelize: require('../utils/db').default,
    tableName: 'users',
    timestamps: true,
    underscored: true
});
