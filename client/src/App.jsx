import React,{useState} from "react";
import { BrowserRouter } from "react-router-dom";
import Main from './components/Main';
import Header from './components/Header';
import Footer from './components/Footer';
import { UserContext } from "./context/userContext";

import './styles/styles.scss'

function App() {

  const [logged, setLoggedIn] = useState(false);

  return (
    <UserContext.Provider value={{ logged, setLoggedIn }}>
    <BrowserRouter>
      <Header />
      <Main />
      <Footer />
    </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App;