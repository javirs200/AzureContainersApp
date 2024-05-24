import React from "react";
import Logout from "../Logout";
import EventsList from "../Dashboard/EventsList";
import MyParticipations from "../Dashboard/MyParticipations";

const Dashboard = () => {

  return (
    <>
      <h1>Dashboard Admin</h1>
      <section className="DashboardContent">
        <EventsList />
        <MyParticipations />
      </section>
      <Logout />
    </>
  );
};

export default Dashboard;