import React from "react";
import Login from "./Login/Login";
import Home from "./Home/Home";
import Offer_View from "./Offer_View/Offer_View";
import Users from "./Users/Users"
import { Route, Routes, Navigate } from "react-router-dom";
import RoleManager from "../../utils/RoleManager";
import ProtectedRoutes from "../../utils/ProtectedRoutes/ProtectedRoutes";

const Main = () => {

  return (
    <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/offer" element={<Offer_View />} />          
          <Route path="/users" element={<Users />} />

          <Route path="/*" element={<Navigate to={"/login"} />} />
        </Routes>
    </main>
  );
};

export default Main;
