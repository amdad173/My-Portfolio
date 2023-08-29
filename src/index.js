import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.REACT_APP_DEVTOOL === 'production') {
  disableReactDevTools();
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
  
);


