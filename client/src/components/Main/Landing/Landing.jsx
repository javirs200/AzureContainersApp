import React from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

const Landing = () => {
  return (
    <>
      <h1>Landing</h1>
      <Button variant="contained">
        <Link className={'link'} to={`/login`}>login</Link>
      </Button>

      <Button variant="contained">
        <Link className={'link'} to={`/Register`}>Register</Link>
      </Button>
    </>
  );
};

export default Landing;
