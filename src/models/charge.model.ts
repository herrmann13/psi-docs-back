import { DataTypes, Model } from "sequelize";

export class ChargeModel extends Model {
    declare id: number;
    declare appointmentId: number;
    declare patientId: number;
    declare originalAmount: string;
    declare outstandingAmount: string;
    declare status: string;
    declare dueDate: Date | null;
    declare createdAt: Date;
    declare updatedAt: Date;
}

ChargeModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    appointmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'appointment_id',
        references: {
            model: 'appointments',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
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
        onDelete: 'RESTRICT'
    },
    originalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'original_amount'
    },
    outstandingAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'outstanding_amount'
    },
    status: {
        type: DataTypes.ENUM('PENDING', 'PARTIALLY_PAID', 'PAID', 'CANCELLED'),
        allowNull: false,
        defaultValue: 'PENDING'
    },
    dueDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        field: 'due_date'
    }
}, {
    sequelize: require('../utils/db').default,
    tableName: 'charges',
    timestamps: true,
    underscored: true
});
