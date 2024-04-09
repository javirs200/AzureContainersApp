import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../../context/userContext";

const EventControl = () => {
    const { eventName,setEventName } = useContext(UserContext)
  return (
    <>
      <h1>EventControl</h1>
      <h3>Evento Selecionado : {eventName}</h3>
    </>
  );
};

export default EventControl;