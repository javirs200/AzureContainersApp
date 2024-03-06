import React, { useContext } from "react";
import Login from "./Login";
import Landing from "./Landing";
import { UserContext } from "../../context/userContext";
import { Route, Routes, Navigate } from "react-router-dom";
import RoleManager from "../../utils/RoleManager";
import ProtectedRoutes from "../../utils/ProtectedRoutes";
import QrComponent from "../../utils/QrComponent/QrComponent";
import DashboardAdmin from "./DashboardAdmin";
import Dashboard from "./Dashboard";
import Register from "./Register";
import Times from "./Times";

import UsersManager from "./DashboardAdmin/UsersManager";
import EventsManager from "./DashboardAdmin/EventsManager";
import CarsManager from "./Dashboard/CarsManager";


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
        <Route path="/times" element={<Times />} />

        <Route path="/*" element={logged ? <Navigate to={"/dashboard"} /> : <Navigate to={"/"} />} />
      </Routes>
      

      <QrComponent/>
    </main>
  );
};

export default Main;
