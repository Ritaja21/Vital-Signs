
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Dashboard.css';  // Import the CSS file for styling
// import SearchBar from './SearchBar';  // Import the SearchBar component
import PatientProfile from '../components/PatientProfile/PatientProfile';  // Import the PatientProfile component

const Dashboard = () => {
    const navigate = useNavigate();
//   const [showSearch, setShowSearch] = useState(false);
//   const [patient, setPatient] = useState(null);

  const handleCardClick = (type) => {
    if (type === 'model') {
        navigate('/search');
    }else if (type === 'add-patient') {
      navigate('/profileupdate');
    }
  };

  return (
    <div className="dashboard">
      <div className="card" onClick={() => handleCardClick('add-patient')}>
        <h2>Add Patient</h2>
        <p>Click here to add a new patient to the system.</p>
      </div>

      <div className="card" onClick={() => handleCardClick('model')}>
      <h2>Model</h2>
        <p>Manage and view model details here.</p>
      </div>
      {/* {showSearch && <SearchBar setPatient={setPatient} />}
      {patient && <PatientProfile patient={patient} />} */}
    </div>
  );
};

export default Dashboard;
