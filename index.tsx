
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/mercator-projection-world-map.svg'; // Ensure Vite copies the SVG asset

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
