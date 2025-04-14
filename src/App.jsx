import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form_login from './components/form';
import Principal from './components/principal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Form_login />} /> 
        <Route path="/principal" element={<Principal />} />
      </Routes>
    </Router>
  );
}

export default App;
