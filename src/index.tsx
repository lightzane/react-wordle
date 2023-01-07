import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.scss';
import { App } from './App';
import { GlobalProvider } from './state/global.context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>
  <GlobalProvider>
    <App />
  </GlobalProvider>
  // </React.StrictMode>
);
