const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    ID: {
        type: Number,
        unique: true
    },
    name: {
        type: String
    },
    birthday: { 
        type: Date
    },
    phone: {
        type: String
    }
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;