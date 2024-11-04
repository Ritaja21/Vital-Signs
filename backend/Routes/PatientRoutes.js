const express = require('express');
const router = express.Router();
const Patient = require('../Models/PatientSchema');
const upload = require('../Middlewares/uploadmiddleware');

//add patient
router.post('/add', async (req, res) => {
    const { name, age, gender, medicalHistory } = req.body;

    try {
        const newPatient = new Patient({
            name,
            age,
            gender,
            medicalHistory,
        });

        const savedPatient = await newPatient.save();
        res.status(201).json({
            message: 'Patient created successfully',
            patientId: savedPatient._id,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create patient' });
    }
});

//search patient
router.get('/:id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving patient' });
    }
});

// Route for uploading patient image
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Find the patient by ID (sent via req.body.patientId)
        const patient = await Patient.findById(req.body.patientId);

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Update the patient's imagePath with the uploaded file's path
        patient.imagePath = req.file.path; // Save the image path in the patient's record
        await patient.save(); // Save the updated patient record to the database

        res.status(200).json({
            message: 'Image uploaded and saved successfully',
            file: req.file,
            updatedPatient: patient, // Return the updated patient object
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error uploading and saving image',
            error: err.message,
        });
    }
});

const FormData = require('form-data'); // Import FormData to handle multipart/form-data
const fs = require('fs');
const axios = require('axios');

// Route to call FastAPI /predict endpoint using previously uploaded image
router.post('/predict', async (req, res) => {
    try {
        console.log(`Received request for patientId: ${req.body.patientId}`);
        // Find the patient by ID
        const patient = await Patient.findById(req.body.patientId);
        console.log('Patient found:', patient);

        // Check if patient exists and has an uploaded image
        if (!patient || !patient.imagePath) {
            return res.status(400).json({ message: 'Patient or image not found' });
        }

        const imagePath = patient.imagePath; // Use the stored image path
        console.log('Image path:', imagePath);

        // Create a FormData object to send the image as multipart/form-data
        const formData = new FormData();
        formData.append('file', fs.createReadStream(imagePath));

        // Make a request to the FastAPI prediction API
        const response = await axios.post('http://localhost:8001/predict', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',  // Ensure the correct content type
                ...formData.getHeaders() // Important: include the form headers
            }
        });

        res.json({
            message: 'Prediction successful',
            predicted_label: response.data.label, // Return predicted label
            confidence: response.data.confidence  // Return prediction confidence
        });
    } catch (error) {
        res.status(500).json({
            message: 'Prediction failed',
            error: error.message
        });
    }
});




module.exports = router;
