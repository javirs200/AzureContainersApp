import React from "react";
import Logout from "../Logout";
import EventsList from "./EventsList";

const Dashboard = () => {

  return (
    <>
      <h1>Dashboard</h1>
      <EventsList/>
      <Logout />
    </>
  );
};

export default Dashboard;