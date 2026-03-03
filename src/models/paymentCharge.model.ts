import { DataTypes, Model } from "sequelize";

export class PaymentChargeModel extends Model {
    declare id: number;
    declare paymentId: number;
    declare chargeId: number;
    declare amountPaid: string;
}

PaymentChargeModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    paymentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'payment_id',
        references: {
            model: 'payments',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
    },
    chargeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'charge_id',
        references: {
            model: 'charges',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
    },
    amountPaid: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'amount_paid'
    }
}, {
    sequelize: require('../utils/db').default,
    tableName: 'payment_charges',
    timestamps: false,
    underscored: true
});
