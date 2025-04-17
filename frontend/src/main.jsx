import React from 'react';
import ReactDOM from 'react-dom/client'; // 👈 this is the updated import
import App from './App.jsx';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
