const { PatientModel } = require('./patient.model');
const { AddressModel } = require('./address.model');
const { UserModel } = require('./user.model');
const { EmergencyContactModel } = require('./emergencyContact.model');

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
}