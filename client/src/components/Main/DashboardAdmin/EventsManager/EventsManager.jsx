import React, { useState, useEffect, useContext } from "react";
import Listado from '../../../../utils/Listado';
import FetchUtil from "../../../../utils/FetchUtil";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";

import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { UserContext } from "../../../../context/userContext";

const EventsManager = () => {

  const navigate = useNavigate();
  const { eventName,setEventName } = useContext(UserContext)

  console.log("EventsManager -> FetchUtil", FetchUtil);

  const { fetchEvents } = FetchUtil;

  const [events, setEvents] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(dayjs());

  useEffect(() => {
    // reset event name
    setEventName('')
    // load events
    fetchEvents().then((data) => setEvents(data));
  }, [])

  const handleSubmitCreate = (e) => {
    e.preventDefault()
    const createEvent = async () => {
      const event = { 'name': name, 'description': description, 'date': new Date(date) }
      // console.log("evento para crear ", event);
      try {
        const response = await fetch(`http://${import.meta.env.VITE_API_HOST}/api/events/new`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: 'include',
          body: JSON.stringify(event),
        });
        if (response.status === 201) {
          let data = await response.json()
          alert('evento creado')
          // console.log("ok create , data api -> ", data);
          fetchEvents().then((data) => setEvents(data));
        } else {
          let data = await response.json()
          alert('error')
          console.log("data api -> ", data);
        }

      } catch (error) {
        console.log(error);
      }
    }
    createEvent()
  }

  const handleclick = (e) => {
    console.log("click evento " ,eventName );
    navigate("/eventControl");
  }

  return (
    <>
      <section className="Events">
        <Listado title={'Eventos'} elementos={events} mode={3} />
      </section>
      <section className="eventControls">
        <form onSubmit={handleSubmitCreate} className="form_add_event">
          <TextField sx={{ m: 2, width: '22ch' }} id="Name" label="Nombre" variant="standard" onChange={(e) => setName(e.target.value)} required />
          <TextField sx={{ m: 2, width: '22ch' }} id="Descripcion" label="Descripcion" variant="standard" multiline maxRows={4} onChange={(e) => setDescription(e.target.value)} required />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha"
              disablePast
              value={date}
              onChange={(newValue) => setDate(newValue)}
            />
          </LocalizationProvider>
          <Button variant="contained" type="submit">Añadir</Button>
        </form>
        <h3>Evento Selecionado : {eventName}</h3>
        <Button variant="outlined" type="submit" onClick={handleclick} >Controlar</Button>
      </section>
    </>

  );
};

export default EventsManager;
