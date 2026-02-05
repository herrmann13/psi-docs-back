import { DataTypes, Model } from "sequelize";

export class PatientModel extends Model {
    declare id: number;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare isActive: boolean;
    declare fullName: string;
    declare cpf: string;
    declare birthDate: Date;
    declare phone: string;
}

PatientModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'is_active'
    },
    fullName: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING(14),
        allowNull: false,
        unique: true
    },
    birthDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'birth_date'
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
        references: {
            model: 'users',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
}, {
    sequelize: require('../utils/db').default,
    tableName: 'patients',
    timestamps: true,
    underscored: true
}); 