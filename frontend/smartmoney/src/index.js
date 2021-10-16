import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';



let theme = createTheme({
  palette: {
    primary: {
      main: '#52347b',
    },
    secondary: {
      main: '#52347b',
    },
  },
});


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);