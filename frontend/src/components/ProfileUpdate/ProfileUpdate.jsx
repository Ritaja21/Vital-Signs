// import React, { useState } from 'react';
// import './ProfileUpdate.css';  // Import the CSS file for styling

// const ProfileUpdate = () => {
//   const [name, setName] = useState('');
//   const [age, setAge] = useState('');
//   const [gender, setGender] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Placeholder for submitting form data
//     console.log("Patient details:", { name, age, gender });
//     alert('Patient details submitted!');
//   };

//   return (
//     <div className="profile-update">
//       <h2>Add New Patient</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Name:
//           <input 
//             type="text" 
//             value={name} 
//             onChange={(e) => setName(e.target.value)} 
//             required 
//           />
//         </label>
//         <label>
//           Age:
//           <input 
//             type="text" 
//             value={age} 
//             onChange={(e) => setAge(e.target.value)} 
//             required 
//           />
//         </label>
//         <label>
//           Gender:
//           <select 
//             value={gender} 
//             onChange={(e) => setGender(e.target.value)} 
//             required
//           >
//             <option value="">Select Gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//         </label>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default ProfileUpdate;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileUpdate.css';  // Import the CSS file for styling

const ProfileUpdate = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');  // Added medical history
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the patient data
    const patientData = {
      name,
      age,
      gender,
      medicalHistory
    };

    try {
      // Make the POST request to the backend
      const response = await fetch('http://localhost:8000/patient/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData),  // Send the patient data as JSON
      });

      const result = await response.json();

      if (response.ok) {
        alert(`Patient added successfully with ID: ${result.patientId}`);
        navigate('/dashboard');  // Redirect to the dashboard after successful submission
      } else {
        alert('Failed to add patient: ' + result.error);
      }
    } catch (error) {
      console.error('Error adding patient:', error);
      alert('Error adding patient');
    }
  };

  return (
    <div className="profile-update">
      <h2>Add New Patient</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Age:
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </label>
        <label>
          Gender:
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label>
          Symptoms:
          <textarea
            value={medicalHistory}
            onChange={(e) => setMedicalHistory(e.target.value)}
            placeholder="Enter patient's symptoms"
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProfileUpdate;

