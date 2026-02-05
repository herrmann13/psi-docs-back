import { DataTypes, Model } from "sequelize";

export class AddressModel extends Model {
    declare id: number;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare street: string;
    declare number: string;
    declare neighborhood: string;
    declare city: string;
    declare state: string;
    declare complement: string | null;
    declare patientId: number;
}

AddressModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    street: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    number: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    complement: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    neighborhood: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    city: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    state: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'patient_id',
        references: {
            model: 'patients',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
    
}, {
    sequelize: require('../utils/db').default,
    tableName: 'addresses',
    timestamps: true,
    underscored: true
});