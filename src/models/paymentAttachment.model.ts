import { DataTypes, Model } from "sequelize";

export class PaymentAttachmentModel extends Model {
    declare id: number;
    declare paymentId: number;
    declare filePath: string;
    declare originalFilename: string;
    declare mimeType: string;
    declare fileSize: number;
    declare fileHash: string;
    declare uploadedAt: Date;
}

PaymentAttachmentModel.init({
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
    filePath: {
        type: DataTypes.STRING(500),
        allowNull: false,
        field: 'file_path'
    },
    originalFilename: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'original_filename'
    },
    mimeType: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'mime_type'
    },
    fileSize: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'file_size'
    },
    fileHash: {
        type: DataTypes.STRING(128),
        allowNull: false,
        field: 'file_hash'
    },
    uploadedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'uploaded_at'
    }
}, {
    sequelize: require('../utils/db').default,
    tableName: 'payment_attachments',
    timestamps: false,
    underscored: true
});
