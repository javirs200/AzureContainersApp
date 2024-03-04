import React, { useContext } from "react";
import Login from "./Login";
import Landing from "./Landing";
import { UserContext } from "../../context/userContext";
import { Route, Routes, Navigate } from "react-router-dom";
import RoleManager from "../../utils/RoleManager";
import ProtectedRoutes from "../../utils/ProtectedRoutes";
import DashboardAdmin from "./DashboardAdmin";
import Dashboard from "./Dashboard";
import UsersManager from "./UsersManager";
import Register from "./Register";
import CarsManager from "./CarsManager";
import EventsManager from "./EventsManager"
import QrComponent from "../../utils/QrComponent/QrComponent";

const Main = () => {

  const { logged, role } = useContext(UserContext);

  return (

    <main>
      <Routes>
        <Route path="/" element={logged ? <Navigate to={"/dashboard"} /> : <Landing />} />

        <Route path="/events" element={logged ? <EventsManager /> : <Navigate to={"/dashboard"} />} />

        <Route path="/login" element={logged ? <Navigate to={"/dashboard"} /> : <Login />} />

        <Route path="/register" element={logged ? <Navigate to={"/dashboard"} /> : <Register />} />

        <Route path="/dashboard" element={
          <ProtectedRoutes logged={logged} component={
            <>
              {role == 'admin' ? <DashboardAdmin />:<Dashboard />}
            </>
          } />
        } />
        <Route path="/myCars" element={
          <ProtectedRoutes logged={logged} component={
            <RoleManager role={role} allowedRoles={['driver']} component={<CarsManager />} />
          } />
        } />
        <Route path="/users" element={
          <ProtectedRoutes logged={logged} component={
            <RoleManager role={role} allowedRoles={['admin']} component={<UsersManager />} />
          } />
        } />
        <Route path="/*" element={logged ? <Navigate to={"/dashboard"} /> : <Navigate to={"/"} />} />
      </Routes>
      <QrComponent/>
    </main>
  );
};

export default Main;
