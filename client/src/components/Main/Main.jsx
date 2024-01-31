import React, { useState } from "react";
import Login from "./Login/Login";
import Home from "./Home/Home";
import Offer_View from "./Offer_View/Offer_View";
import Users from "./Users/Users"
import { Route, Routes, Navigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import "./Main.css";

const Main = () => {
  const [logged, setLoggedIn] = useState(false);

  return (
    <main>
      <UserContext.Provider value={{ logged, setLoggedIn }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/offer" element={<Offer_View />} />          
          <Route path="/users" element={<Users />} />

          <Route path="/*" element={<Navigate to={"/login"} />} />
        </Routes>
      </UserContext.Provider>
    </main>
  );
};

export default Main;
