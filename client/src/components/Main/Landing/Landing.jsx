import React from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import QrComponent from "../../../utils/QrComponent";

const Landing = () => {

  const navigate = useNavigate();

  return (
    <>
      <h1>CronoTimer</h1>
      <section>
        <h2>Get Started</h2>
        <Button variant="contained" onClick={() => { navigate("/login") }}>
          Login
        </Button>
        <Button variant="text" onClick={() => { navigate("/register") }}>
          Register
        </Button>
      </section>  
      <QrComponent/>
    </>
  );
};

export default Landing;
