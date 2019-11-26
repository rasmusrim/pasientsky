const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const patientSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    name: {
        type: String
    },
    dob: { 
        type: Date
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    medications: {
        type: String
    }
});

patientSchema.plugin(AutoIncrement, {inc_field: 'id'});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;