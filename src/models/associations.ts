const { PatientModel } = require('./patient.model');
const { AddressModel } = require('./address.model');
const { UserModel } = require('./user.model');
const { EmergencyContactModel } = require('./emergencyContact.model');
const { AppointmentModel } = require('./appointment.model');
const { ChargeModel } = require('./charge.model');
const { PaymentModel } = require('./payment.model');
const { PaymentChargeModel } = require('./paymentCharge.model');
const { PaymentAttachmentModel } = require('./paymentAttachment.model');

export function initAssociations() {
    
    UserModel.hasMany(PatientModel, {
        foreignKey: 'user_id',
        as: 'patients'
    });
    PatientModel.belongsTo(UserModel, {
        foreignKey: 'user_id',
        as: 'user'
    });

    PatientModel.hasOne(AddressModel, {
        foreignKey: 'patient_id',
        as: 'address'
    });
    AddressModel.belongsTo(PatientModel, {
        foreignKey: 'patient_id',
        as: 'patient'
    });

    PatientModel.hasMany(EmergencyContactModel, {
        foreignKey: 'patient_id',
        as: 'emergencyContacts'
    });
    
    EmergencyContactModel.belongsTo(PatientModel, {
        foreignKey: 'patient_id',
        as: 'patient'
    });

    UserModel.hasMany(AppointmentModel, {
        foreignKey: 'psychologist_id',
        as: 'appointments'
    });
    AppointmentModel.belongsTo(UserModel, {
        foreignKey: 'psychologist_id',
        as: 'psychologist'
    });

    PatientModel.hasMany(AppointmentModel, {
        foreignKey: 'patient_id',
        as: 'appointments'
    });
    AppointmentModel.belongsTo(PatientModel, {
        foreignKey: 'patient_id',
        as: 'patient'
    });

    AppointmentModel.hasOne(ChargeModel, {
        foreignKey: 'appointment_id',
        as: 'charge'
    });
    ChargeModel.belongsTo(AppointmentModel, {
        foreignKey: 'appointment_id',
        as: 'appointment'
    });

    PatientModel.hasMany(ChargeModel, {
        foreignKey: 'patient_id',
        as: 'charges'
    });
    ChargeModel.belongsTo(PatientModel, {
        foreignKey: 'patient_id',
        as: 'patient'
    });

    PatientModel.hasMany(PaymentModel, {
        foreignKey: 'patient_id',
        as: 'payments'
    });
    PaymentModel.belongsTo(PatientModel, {
        foreignKey: 'patient_id',
        as: 'patient'
    });

    PaymentModel.hasMany(PaymentChargeModel, {
        foreignKey: 'payment_id',
        as: 'paymentCharges'
    });
    PaymentChargeModel.belongsTo(PaymentModel, {
        foreignKey: 'payment_id',
        as: 'payment'
    });

    ChargeModel.hasMany(PaymentChargeModel, {
        foreignKey: 'charge_id',
        as: 'paymentCharges'
    });
    PaymentChargeModel.belongsTo(ChargeModel, {
        foreignKey: 'charge_id',
        as: 'charge'
    });

    PaymentModel.hasMany(PaymentAttachmentModel, {
        foreignKey: 'payment_id',
        as: 'attachments'
    });
    PaymentAttachmentModel.belongsTo(PaymentModel, {
        foreignKey: 'payment_id',
        as: 'payment'
    });
}
