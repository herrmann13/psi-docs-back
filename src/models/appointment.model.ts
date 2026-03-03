import { DataTypes, Model } from "sequelize";

export class AppointmentModel extends Model {
    declare id: number;
    declare patientId: number;
    declare psychologistId: number;
    declare startTime: Date;
    declare endTime: Date;
    declare status: string;
    declare sessionValue: string;
    declare cancelledAt: Date | null;
    declare cancelledReason: string | null;
    declare completedAt: Date | null;
    declare rescheduledAt: Date | null;
    declare rescheduleReason: string | null;
    declare createdAt: Date;
    declare updatedAt: Date;
}

AppointmentModel.init({
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
    psychologistId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'psychologist_id',
        references: {
            model: 'users',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
    },
    startTime: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'start_time'
    },
    endTime: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'end_time'
    },
    status: {
        type: DataTypes.ENUM('SCHEDULED', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW'),
        allowNull: false
    },
    sessionValue: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'session_value'
    },
    cancelledAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'cancelled_at'
    },
    cancelledReason: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'cancelled_reason'
    },
    completedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'completed_at'
    },
    rescheduledAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'rescheduled_at'
    },
    rescheduleReason: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'reschedule_reason'
    }
}, {
    sequelize: require('../utils/db').default,
    tableName: 'appointments',
    timestamps: true,
    underscored: true
});
