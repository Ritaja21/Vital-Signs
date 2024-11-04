
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import BottomBar from './components/Bottombar/Bottombar';
import Dashboard from './pages/Dashboard';
// import SearchBar from './pages/SearchBar';
import PatientProfile from './components/PatientProfile/PatientProfile';
import ProfileUpdate from './components/ProfileUpdate/ProfileUpdate';
import SearchPage from './components/SearchPage/SearchPage';
import Report from './components/Report/Report';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profileupdate" element={<ProfileUpdate />} />
        <Route path="/patientprofile" element={<PatientProfile />} />
        <Route path="/report" element={<Report />} />
      </Routes>
      <BottomBar />
    </>
  );
}

export default App;
