
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PatientProfile.css';  // Import the CSS file for styling

const PatientProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Access patient data passed through route state
  const patient = location.state?.patient;

  if (!patient) {
    return <div>No patient data available.</div>;
  }

  const [showForm, setShowForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // To store the selected image file
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false); // To track the processing state

  const handleClick = () => {
    setShowForm(true);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Save the selected file to state
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

    // Create a FormData object to send the image and patient ID to the server
    const formData = new FormData();
    formData.append('image', selectedFile); // Append the selected file
    formData.append('patientId', patient._id); // Append the patient ID

    console.log([...formData]);  // For debugging, to log the form data

    try {
      setUploading(true);

      // Use fetch to make a POST request
      const response = await fetch('http://localhost:8000/patient/upload', {
        method: 'POST',
        body: formData, // Send the form data containing the file and patient ID
      });

      // Check if the request was successful
      if (response.ok) {
        const data = await response.json(); // Parse the JSON response
        alert('Image uploaded successfully!');
        console.log('Response:', data);
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  const handleProcess = async () => {
    try {
      setProcessing(true);

      // Call the predict API with patient ID
      const response = await fetch('http://localhost:8000/patient/predict', {
        method: 'POST',
        body: JSON.stringify({ patientId: patient._id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Prediction failed');
      }

      const data = await response.json();
      console.log('Prediction Response:', data); // Add console log to inspect response

      // Check if the backend is correctly returning 'predicted_label'
      if (!data.predicted_label) {
        console.error('Backend returned undefined prediction:', data);
        throw new Error('Backend returned undefined prediction'); // Log error if undefined
      }

      // Redirect to report with correct state
      navigate('/report', {
        state: {
          patient,
          prediction: data.predicted_label, // This should be defined
          confidence: data.confidence,      // This should be defined
        },
      });
    } catch (error) {
      console.error('Error processing prediction:', error);
      alert('Error processing prediction');
    } finally {
      setProcessing(false);
    }
  };



  return (
    <div className="patient-profile">
      <div className="profile-card" onClick={handleClick}>
        <h2>{patient.name}</h2>
        <p>ID: {patient._id}</p>
      </div>
      {showForm && (
        <div className="profile-form">
          <h3>Patient Details</h3>
          <form>
            <label>
              Name:
              <input type="text" value={patient.name} readOnly />
            </label>
            <label>
              Age:
              <input type="text" value={patient.age} readOnly />
            </label>
            <label>
              Gender:
              <input type="text" value={patient.gender} readOnly />
            </label>
            <label>
              Patient ID:
              <input type="text" value={patient._id} readOnly />
            </label>
            <label>
              Upload image:
              <input type="file" name="file" onChange={handleFileChange} />
            </label>
            <button
              type="button"
              onClick={handleUpload}
              disabled={uploading} // Disable the button while uploading
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
            <label>
              For image processing:
              <button
                type="button"
                onClick={handleProcess}
                disabled={processing} // Disable button while processing
              >
                {processing ? 'Processing...' : 'Process'}
              </button>
            </label>
          </form>
        </div>
      )}
    </div>
  );
};

export default PatientProfile;
