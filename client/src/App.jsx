import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminRoute from './admin/AdminRoute'; // Admin route handler

import { ToastContainer } from 'react-toastify';
import AppRoute from './components/AppRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminRoute />} />
        <Route path='/*' element={<AppRoute/>}/>
      </Routes>
      <ToastContainer /> 
    </BrowserRouter>
  );
}

export default App;
