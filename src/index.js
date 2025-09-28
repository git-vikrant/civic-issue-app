import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// The full file extension is now MANDATORY for local imports
import App from './App.tsx'; 

// Use the modern React 18 root API
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element.");
}