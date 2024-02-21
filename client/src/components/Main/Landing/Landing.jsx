import React from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

const Landing = () => {

  const navigate = useNavigate();

  return (
    <>
      <h1>Landing</h1>
      <Button variant="contained" onClick={()=>{navigate("/login")}}>
        Login
      </Button>
      <Button variant="text" onClick={()=>{navigate("/register")}}>
        Register
      </Button>
    </>
  );
};

export default Landing;
