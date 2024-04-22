import React, { useContext } from "react";
import FetchUtil from "../../../utils/FetchUtil/FetchUtil";
import { UserContext } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Logout = () => {

  const { logoutUser } = FetchUtil;

  const navigate = useNavigate();
  const { setLoggedIn } = useContext(UserContext);

  const handleClick = async () => {
    const response = await logoutUser();
    if (response.status === 200) {
      setLoggedIn(false);
      alert("logout correcto");
      navigate("/");
    } else {
      alert("fallo logout");
    }
  }
  return (
    <>
      <Button variant="contained" onClick={handleClick}>
        Logout
      </Button>
    </>
  );
};

export default Logout;