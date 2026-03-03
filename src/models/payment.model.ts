import { DataTypes, Model } from "sequelize";

export class PaymentModel extends Model {
    declare id: number;
    declare patientId: number;
    declare totalAmount: string;
    declare paymentMethod: string;
    declare paymentDate: Date;
    declare notes: string | null;
    declare createdAt: Date;
    declare updatedAt: Date;
}

PaymentModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'total_amount'
    },
    paymentMethod: {
        type: DataTypes.ENUM('PIX', 'BANK_TRANSFER', 'CASH', 'CREDIT_CARD', 'DEBIT_CARD'),
        allowNull: false,
        field: 'payment_method'
    },
    paymentDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'payment_date'
    },
    notes: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    sequelize: require('../utils/db').default,
    tableName: 'payments',
    timestamps: true,
    underscored: true
});
