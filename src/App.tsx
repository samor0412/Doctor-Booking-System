import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import DoctorList from './containers/DoctorList';
import DoctorProfile from './containers/DoctorProfile';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/doctor-list" element={<DoctorList />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
          <Route path="*" element={<Navigate replace to="/doctor-list" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
