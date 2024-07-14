import React from 'react';
import ReactDOM from 'react-dom';
import AppWithRouter from './App';
import { ThemeProvider } from './contexts/theme';
import './index.css';

ReactDOM.render(
  <ThemeProvider>
    <AppWithRouter />
  </ThemeProvider>,
  document.getElementById('root')
);
