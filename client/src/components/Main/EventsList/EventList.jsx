import React, { useState, useEffect } from "react";
import Listado from '../../../utils/Listado';

const EventsList = () => {

  const [events, setEvents] = useState([]);

  const fetchEvents = () => {

    const fetchApi = async () => {
      try {
        const response = await fetch(`http://${import.meta.env.VITE_API_HOST}/api/events/all`, {
          method: "GET",
          credentials: 'include',
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json()

        // console.log('todos los eventos ', data);

        if (data) {
          setEvents(data)
        } else {
          setEvents([])
        }
      } catch {
        setEvents([])
      }
    }
    fetchApi();
  }

  useEffect(() => {
    fetchEvents()
  }, [])


  return (
    <>
      <section className="Events">
        <Listado title={'Eventos'} elementos={events} mode={1} />
      </section>
    </>

  );
};

export default EventsList;
