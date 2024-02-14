import React, { useContext } from "react";
import Login from "./Login";
import Home from "./Home";
import Landing from "./Landing";
import Users from "./Users";
import { UserContext } from "../../context/userContext";
import { Route, Routes, Navigate } from "react-router-dom";
import RoleManager from "../../utils/RoleManager";
import ProtectedRoutes from "../../utils/ProtectedRoutes";

const Main = () => {

  const { logged, role } = useContext(UserContext);

  return (

    <main>
      <Routes>
        <Route path="/" element={logged ? <Navigate to={"/dashboard"} /> : <Landing />} />

        <Route path="/login" element={logged ? <Navigate to={"/dashboard"} /> : <Login />} />

        <Route path="/dashboard" element={
          <ProtectedRoutes logged={logged} component={
            <RoleManager role={role} allowedRoles={['admin']} component={<Home />} />
          } />
        } />
        <Route path="/users" element={
          <ProtectedRoutes logged={logged} component={
            <RoleManager role={role} allowedRoles={['admin']} component={<Users />} />
          } />
        } />
        <Route path="/*" element={logged ? <Navigate to={"/dashboard"} /> : <Navigate to={"/"} />} />
      </Routes>
    </main>
  );
};

export default Main;
