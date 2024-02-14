import React, { useContext } from "react";
import Login from "./Login";
import Home from "./Home";
import Landing from "./Landing";
import Users from "./Users";
import { UserContext } from "../../context/userContext";
import { Route, Routes, Navigate } from "react-router-dom";
import RoleManager from "../../utils/RoleManager";
import ProtectedRoutes from "../../utils/ProtectedRoutes";
import Autologger from "../../utils/Autologger";

const Main = () => {

  const { logged, role } = useContext(UserContext);

  return (

    <main>
      <Autologger component={
        <Routes>
          <Route path="/" element={logged ? <Navigate to={"/dashboard"} /> : <Landing />} />

          <Route path="/login" element={logged ? <Navigate to={"/dashboard"} /> : <Login />} />

          <Route path="/dashboard" element={<RoleManager role={role} allowedRoles={['admin']}><Home /></RoleManager>} />
          <Route path="/users" element={
            <ProtectedRoutes logged={logged} component={
              <RoleManager role={role} allowedRoles={['admin']} component={<Users />} />
            } />
          } />
          <Route path="/*" element={logged ? <Navigate to={"/landing"} /> : <Navigate to={"/login"} />} />
        </Routes>
      } />
    </main>
  );
};

export default Main;
