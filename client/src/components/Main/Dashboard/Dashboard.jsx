import React from "react";
import Logout from "../Logout";
import EventsList from "./EventsList";
import MyParticipations from "./MyParticipations";

const Dashboard = () => {

  return (
    <>
      <h1>Dashboard</h1>
      <section className="DashboardContent">
        <EventsList />
        <MyParticipations />
      </section>
      <Logout />
    </>
  );
};

export default Dashboard;