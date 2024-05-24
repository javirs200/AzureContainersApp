import React, { useState, useEffect, useContext } from "react";
import Listado from '../../../utils/Listado';
import { UserContext } from "../../../context/userContext";
import FetchUtil from "../../../utils/FetchUtil";
import EventTable from "./EventTable";

const Times = () => {

  const { fetchEvents } = FetchUtil;

  const { eventName,setEventName} = useContext(UserContext)
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // reset event name
    setEventName('')
    // load events
    fetchEvents().then((data) => setEvents(data));
  }, [])

  

  return (
    <>
      <section className="Times">
        <Listado title={'Eventos'} elementos={events} mode={3} />
      </section>
      {eventName ? 
      <section className="TableTimes">
        <h1>evento : {eventName }</h1>
        <EventTable/>
      </section> 
      : null }
    </>

  );
};

export default Times;