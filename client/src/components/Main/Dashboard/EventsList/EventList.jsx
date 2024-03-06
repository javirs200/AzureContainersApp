import React, { useState, useEffect, useContext } from "react";
import Listado from '../../../../utils/Listado';
import { UserContext } from "../../../../context/userContext";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

import { FormControl, Button, Select, MenuItem, InputLabel } from "@mui/material";

const EventsList = () => {

  const navigate = useNavigate();
  const { email, eventUuid, eventName } = useContext(UserContext)
  const [events, setEvents] = useState([]);
  const [cars, setCars] = useState([]);
  const [carUuid, setCarUuid] = useState('');

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

  const fetchCars = () => {

    const fetchApi = async () => {
      try {

        const response = await fetch(`http://${import.meta.env.VITE_API_HOST}/api/cars/getfromUser/${email}`, {
          method: "GET",
          credentials: 'include',
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json()

        // console.log('todos los coches de ', email, ' -> ', data);

        if (data) {
          setCars(data)
        } else {
          setCars([])
        }
      } catch {
        setCars([])
      }
    }
    fetchApi();
  }


  useEffect(() => {
    fetchEvents()
    fetchCars()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newParticipation = async () => {
      try {
        const participation = { carUuid: carUuid, eventUuid: eventUuid };

        const response = await fetch(`http://${import.meta.env.VITE_API_HOST}/api/participations/new`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: 'include',
          body: JSON.stringify(participation),
        });
        if (response.status === 201) {
          let data = await response.json()
          alert('participacion registrada !')
        } else {
          let data = await response.json()
          alert('participacion response warning')
          console.log("warning",data);
        }
        navigate("/");
      } catch (error) {
        alert('participacion error ' + error.toString())
      }
    };
    newParticipation();
  }

  const handleChange = (e) => {
    console.log("coche elegido", e.target.value);
    setCarUuid(e.target.value)
  }

  const drawList = () => {
    console.log("dibujando coches ", cars);
    return cars.map((el) => {
      return <MenuItem key={uuidv4()} value={el.uuid}>{el.body}</MenuItem>
    })
  }

  return (
    <>
      <section className="Events">
        <Listado title={'Eventos'} elementos={events} mode={3} />
        <form onSubmit={handleSubmit} className="form_event_inscription">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="carSelectInput">Car</InputLabel>
            <Select
              labelId="carSelectLabel"
              id="carSelect"
              value={carUuid}
              onChange={handleChange}
              label="car"
            >
              {drawList()}
            </Select>
          </FormControl>
          <h3>Evento Selecionado : {eventName}</h3>
          <Button variant="outlined" type="submit" >inscribirse</Button>
        </form>
      </section>
    </>

  );
};

export default EventsList;
