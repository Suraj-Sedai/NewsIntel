// src/App.jsx
import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import Navbar      from './components/Navbar';
import NewsList    from './components/NewsList';
import Login       from './components/Login';
import Register    from './components/Register';
import Preferences from './components/Preferences';

export default function App() {
  const { token } = useContext(AuthContext);
  console.log('🔑 token is:', token);

  return (
    <Router>
      {token && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={token
            ? <NewsList />
            : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/login"
          element={!token
            ? <Login />
            : <Navigate to="/" replace />
          }
        />
        <Route
          path="/register"
          element={!token
            ? <Register />
            : <Navigate to="/" replace />
          }
        />
        <Route
          path="/preferences"
          element={token
            ? <Preferences />
            : <Navigate to="/login" replace />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
