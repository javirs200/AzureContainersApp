import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Main from './components/Main';
import Header from './components/Header';
import Footer from './components/Footer';
import Autologger from "./utils/Autologger/Autologger";

import { UserContext } from "./context/userContext";

import socket from "./config/socket";

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
  // roles , 'admin' 'driver'
  const [role, setRole] = useState('driver');
  const [email, setEmail] = useState('');
  const [carName, setCarName] = useState([]);
  const [carUuid,setCarUuid] = useState('');
  const [eventName, setEventName] = useState([]);
  const [eventUuid,setEventUuid] = useState('');

  // console.log('variables de entorno cargadas -> ',import.meta.env);
  
  // if (import.meta.env.PROD) {
  //   console.log('variables de entorno cargadas -> ',process.env);
  // }

  
  useEffect(() => {
    //codigo para cuando monta el compomente
    socket.connect()
    return () => {
      //codigo para cuando desmonta el compomente
      socket.disconnect()
    }
  }, [])
  
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <UserContext.Provider value={{ logged, setLoggedIn,role,setRole,email,setEmail,carUuid,setCarUuid,carName,setCarName,eventUuid,setEventUuid,eventName,setEventName}}>
        <BrowserRouter>
          <Header />
          <Autologger component={<Main />}/>
          <Footer />
        </BrowserRouter>
      </UserContext.Provider>
    </ThemeProvider>
  )
}

export default App;