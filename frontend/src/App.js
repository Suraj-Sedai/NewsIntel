// src/App.jsx
import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';

import Navbar from './components/Navbar';
import NewsList from './components/NewsList';
import Login from './components/Login';
import Register from './components/Register';
import Preferences from './components/Preferences';

function App() {
  const { token } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />

      <Routes>
        {/* if logged in, show NewsList; otherwise redirect to /login */}
        <Route
          path="/"
          element={token
            ? <NewsList />
            : <Navigate to="/login" replace />
          }
        />

        {/* login/register only for unauthenticated users */}
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

        {/* preferences only if logged in */}
        <Route
          path="/preferences"
          element={token
            ? <Preferences />
            : <Navigate to="/login" replace />
          }
        />

        {/* catch‐all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
