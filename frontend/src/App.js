// src/App.jsx
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import NewsList from './components/NewsList';
import Login from './components/Login';
import Register from './components/Register';
import Preferences from './components/Preferences';
import { AuthContext } from './contexts/AuthContext';

function App() {
  const { token } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<NewsList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/preferences"
          element={token ? <Preferences /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
