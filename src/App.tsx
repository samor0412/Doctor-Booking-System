import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import DoctorList from './containers/DoctorList';
import DoctorProfile from './containers/DoctorProfile';
import Header from 'components/Header';

const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <Header title="Doctor" />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/doctor-list" element={<DoctorList />} />
            <Route path="/doctor-profile" element={<DoctorProfile />} />
            <Route path="*" element={<Navigate replace to="/doctor-list" />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
