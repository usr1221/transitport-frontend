import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/LoginForm';
import Employees from './pages/Employees';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/employees" element={<Employees />} />
        </Routes>
      </Router>
  );
}

export default App;
