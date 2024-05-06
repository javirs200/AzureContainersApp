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
  const { eventName, setEventName } = useContext(UserContext)

  // console.log("EventsManager -> FetchUtil", FetchUtil);

  const { fetchEvents, fetchNewEvent, fetchDeleteEvent } = FetchUtil;

  const [events, setEvents] = useState([]);
  const [uuid, setUuid] = useState(''); // events[0].uuid
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
        const response = await fetchNewEvent(event);
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

  const handleclickControl = (e) => {
    console.log("click evento ", eventName);
    navigate("/eventControl");
  }

  const handleclickDelete = (e) => {
    e.preventDefault()
    const deleteEvent = async () => {
      // console.log(edit);
      try {
        const response = await fetchDeleteEvent(eventName)
        if (response.status === 200) {
          let data = await response.json()
          alert('evento borrado')
          console.log("ok delete event , data api -> ", data);
          fetchEvents().then((data) => setEvents(data));
        } else {
          let data = await response.json()
          alert('error evento no borrado')
          console.log("data api -> ", data);
        }

      } catch (error) {
        console.log(error);
      }
    }
    deleteEvent()
  }

  return (
    <section className="eventsManager">
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
        <div className="eventManage">
          <h3>
            <p>Evento Selecionado :</p>
            <p>{eventName}</p>
          </h3>
          <Button variant="outlined" type="submit" onClick={handleclickControl} >Controlar</Button>
          <Button variant="outlined" color="error" onClick={handleclickDelete} >eliminar</Button>
        </div>
      </section>
    </section>

  );
};

export default EventsManager;
