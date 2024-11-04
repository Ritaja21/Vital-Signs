
import React, { useState } from 'react';
import './SearchBar.css';  // Import the CSS file for styling

const SearchBar = ({ setPatient }) => {
  const [searchId, setSearchId] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setError('');  // Clear any previous errors

    try {
      const response = await fetch(`http://localhost:8000/patient/${searchId}`);

      if (!response.ok) {
        // If the patient is not found or there's an error
        const result = await response.json();
        setError(result.message || 'Error retrieving patient');
        setPatient(null);  // Clear the patient state if no patient is found
        return;
      }

      const foundPatient = await response.json();
      setPatient(foundPatient);  // Pass the patient data to the parent component

    } catch (error) {
      console.error('Error fetching patient:', error);
      setError('Failed to search patient. Please try again.');
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        placeholder="Enter Patient ID"
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p className="error">{error}</p>}  {/* Display error if any */}
    </div>
  );
};

export default SearchBar;
