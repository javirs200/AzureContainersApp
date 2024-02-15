import React from "react";
import { Link,useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Landing</h1>
      <Button variant="contained">
        <Link className={'link'} to={`/login`}>login</Link>
      </Button>
    </>
  );
};

export default Landing;
