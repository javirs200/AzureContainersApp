import React, { useContext } from "react";
import FetchUtil from "../../../utils/FetchUtil/FetchUtil";
import { UserContext } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Logout = () => {

  const { fetchLogoutUser } = FetchUtil;

  const navigate = useNavigate();
  const { setLoggedIn,setRole,setEmail,setCarUuid,setCarName,setEventUuid,setEventName } = useContext(UserContext);

  const clearContext = () => {
    setLoggedIn(false);
    setRole('driver');
    setEmail('');
    setCarName('');
    setCarUuid('');
    setEventName('');
    setEventUuid('');
  }

  const handleClick = async () => {
    const response = await fetchLogoutUser();
    if (response.status === 200) {
      clearContext();
      alert("Sesión cerrada correctamente");
      navigate("/");
    } else {
      alert("Fallo al cerrar sesión");
    }
  }
  return (
    <>
      <Button variant="contained" onClick={handleClick}>
        Cerrar sesión
      </Button>
    </>
  );
};

export default Logout;