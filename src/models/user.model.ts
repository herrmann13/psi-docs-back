import { DataTypes, Model } from "sequelize";

export class UserModel extends Model {
    declare id: number;
    declare name: string;
    declare email: string;
    declare password: string | null;
    declare googleId: string | null;
    declare licenseNumber: string | null;
    declare defaultSessionValue: string | null;
    declare isActive: boolean;
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
    },
    licenseNumber: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: true,
        field: 'license_number'
    },
    defaultSessionValue: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        field: 'default_session_value'
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'is_active'
    }
}, {
    sequelize: require('../utils/db').default,
    tableName: 'users',
    timestamps: true,
    underscored: true
});
