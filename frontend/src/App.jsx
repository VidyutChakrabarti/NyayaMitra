import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Landing';
import Threats from './pages/Threats';
import FormPage from './pages/Form';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/threats" element={<Threats />} />
      <Route path="/form" element={<FormPage />} />
    </Routes>
  );
};

export default App;