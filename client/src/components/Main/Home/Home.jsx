import React, { useEffect, useContext } from "react";
import { UserContext } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { setLoggedIn } = useContext(UserContext);

  const handleClick = async () => {
    const response = await fetch(`http://${import.meta.env.VITE_API_HOST}/api/login/logout`, {
      credentials: 'include',
    });
    if (response.status === 200) {
      setLoggedIn(false);
      alert("logout correcto");
      navigate("/login");
    } else {
      alert("fallo logout");
    }
  }
  return (
    <>
      <h1>HOME</h1>
      <br />
      <button onClick={handleClick}>logout</button>
    </>
  );
};

export default Home;
