import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Main from './components/Main';
import Header from './components/Header';
import Footer from './components/Footer';
import { UserContext } from "./context/userContext";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

import './styles/styles.scss'

function App() {

  const [logged, setLoggedIn] = useState(false);
  // roles , 'admin' 'user'
  const [role, setRole] = useState('user');

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <UserContext.Provider value={{ logged, setLoggedIn, role, setRole }}>
        <BrowserRouter>
          <Header />
          <Main />
          <Footer />
        </BrowserRouter>
      </UserContext.Provider>
    </ThemeProvider>
  )
}

export default App;