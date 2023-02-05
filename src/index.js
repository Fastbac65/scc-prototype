import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ContextProvider } from './components/context/ContextProvider';
import { BrowserRouter } from 'react-router-dom';

// <script async src='//www.instagram.com/embed.js'></script>;
//<script async defer src='https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2'></script>;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <ContextProvider>
      <App />
    </ContextProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
