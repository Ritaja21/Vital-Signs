import React from 'react';
import { useLocation } from 'react-router-dom'; // Access state passed during navigation
import './Report.css'; // CSS for styling
import jsPDF from 'jspdf'; // Import jsPDF for generating PDFs


const Report = () => {
    const location = useLocation();
    console.log('Location state:', location.state);
    const { patient, prediction, confidence } = location.state || {};


    if (!patient || !prediction || confidence === undefined) {
        return <div>No report data available.</div>;
    }

    const handleDownload = () => {
        const doc = new jsPDF();

        // Title
        doc.setFontSize(16);
        doc.text('Patient Report', 10, 10);

        // Patient details section
        doc.setFontSize(12);
        doc.text('Patient Details', 10, 20);
        doc.text(`Name: ${patient.name}`, 10, 30);
        doc.text(`Age: ${patient.age}`, 10, 40);
        doc.text(`Gender: ${patient.gender}`, 10, 50);
        doc.text(`Patient ID: ${patient._id}`, 10, 60);

        // Prediction result section
        doc.text('Prediction Result', 10, 80);
        doc.text(`Prediction: ${prediction === 'Normal' ? 'Patient is normal' : 'Patient is suspected to have Pneumonia'}`, 10, 90);
        doc.text(`Accuracy Rate: ${(confidence * 100).toFixed(2)}%`, 10, 100);
        doc.text(`Symptoms: ${patient.medicalHistory || 'N/A'}`, 10, 110);

        // Save the PDF
        doc.save(`Patient_Report_${patient.name}.pdf`);
    };


    return (
        <div className="report">
            <h2>Patient Report</h2>
            <div className="report-card">
                <h3>Patient Details</h3>
                <p><strong>Name:</strong> {patient.name}</p>
                <p><strong>Age:</strong> {patient.age}</p>
                <p><strong>Gender:</strong> {patient.gender}</p>
                <p><strong>Patient ID:</strong> {patient._id}</p>
            </div>
            <div className="prediction-card">
                <h3>Prediction Result</h3>
                <p><strong>Prediction:</strong> {prediction === 'Normal' ? 'Patient is normal' : 'Patient is suspected to have Pneumonia'}</p>
                <p><strong>Accuracy Rate:</strong> {confidence.toFixed(4) * 100}%</p>
                <p><strong>Symptoms:</strong>{patient.medicalHistory}</p>
            </div>
            <button onClick={handleDownload}>Download</button>
        </div>
    );
};

export default Report;
