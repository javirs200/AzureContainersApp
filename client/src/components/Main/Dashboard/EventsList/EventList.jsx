import React, { useState, useEffect, useContext } from "react";
import Listado from '../../../../utils/Listado';
import { UserContext } from "../../../../context/userContext";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import FetchUtil from "../../../../utils/FetchUtil";

import { FormControl, Button, Select, MenuItem, InputLabel } from "@mui/material";

const EventsList = () => {

  const { fetchEvents, fetchMyCars,fetchNewParticipation } = FetchUtil;

  const navigate = useNavigate();
  const { email, eventUuid, eventName } = useContext(UserContext)
  const [events, setEvents] = useState([]);
  const [cars, setCars] = useState([]);
  const [carUuid, setCarUuid] = useState('');

  useEffect(() => {
    fetchMyCars(email).then((data) => setCars(data));
    fetchEvents().then((data) => setEvents(data));
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newParticipation = async () => {
      try {
        const participation = { carUuid: carUuid, eventUuid: eventUuid };

        const response = await fetchNewParticipation(participation);
        if (response.status === 201) {
          let data = await response.json()
          console.log("participacion registrada", data);
          alert('participacion registrada !')
        } else {
          let data = await response.json()
          console.log("participacion warning", JSON.stringify(data));
          if (data.msg) {
            console.log("participacion warning", JSON.stringify(data));
            alert(data.msg.toString())
          }
        }
        navigate("/");
      } catch (error) {
        alert('participacion error ' + error.toString())
      }
    };
    newParticipation();
  }

  const handleChange = (e) => {
    setCarUuid(e.target.value)
  }

  const drawList = () => {
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
