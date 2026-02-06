import { DataTypes, Model } from "sequelize";

export class EmergencyContactModel extends Model {
    declare id: number;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare isActive: boolean;
    declare name: string;
    declare phone: string;
    declare patientId: number;
}

EmergencyContactModel.init({
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
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(20),
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
    tableName: 'emergency_contacts',
    timestamps: true,
    underscored: true
});
