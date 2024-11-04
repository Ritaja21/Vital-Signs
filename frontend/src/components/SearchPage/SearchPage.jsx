
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../pages/SearchBar'; // Import the SearchBar component
import './SearchPage.css';
import PatientProfile from '../PatientProfile/PatientProfile';

const SearchPage = () => {
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Navigate to PatientProfile and pass patient data
    if (patient) {
      navigate('/patientprofile', { state: { patient } });
    } else {
      alert('Please search for a patient first.');
    }
  };

  return (
    <div className="search-page">
      <h2 className="search-heading">Search for Patient</h2>
      <SearchBar setPatient={setPatient} />
      {patient && (
        <div>
          <h3>Patient Found</h3>
          <div className="patient-card" onClick={handleCardClick}>
            <p><strong>Name:</strong> {patient.name}</p>
            <p><strong>Gender:</strong> {patient.gender}</p>
            <p><strong>ID:</strong> {patient.id}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;

