// src/index.js

import React from 'react';
import { createRoot } from 'react-dom/client';   // ← import from react-dom/client
import App from './App';
import { AuthProvider } from './contexts/AuthContext';

const container = document.getElementById('root');
const root = createRoot(container);               // ← create the root

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
