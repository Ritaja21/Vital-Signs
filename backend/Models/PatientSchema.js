const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    medicalHistory: { type: String, required: false },
    imagePath: { type: String, required: false },
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
