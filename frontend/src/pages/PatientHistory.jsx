import React, { useState } from 'react';
import './PatientProfile.css';  // Import the CSS file for styling

const PatientProfile = ({ patient }) => {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(true);
  };

  return (
    <div className="patient-profile">
      <div className="profile-card" onClick={handleClick}>
        <h2>{patient.name}</h2>
        <p>ID: {patient.id}</p>
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
              Date of Birth:
              <input type="text" value={patient.dob} readOnly />
            </label>
            <label>
              Gender:
              <input type="text" value={patient.gender} readOnly />
            </label>
            <label>
              Patient ID:
              <input type="text" value={patient.id} readOnly />
            </label>
            <button type="button">Upload</button>
            <button type="button">Process</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PatientProfile;

