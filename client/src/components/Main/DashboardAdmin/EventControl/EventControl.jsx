import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../../context/userContext";

import socket from "../../../../config/socket";

import FetchUtil from "../../../../utils/FetchUtil";

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material'
import {Wifi,WifiOff} from '@mui/icons-material'

const EventControl = () => {

  const { fetchParticipants } = FetchUtil;
  const [buttonEnable, setButtonEnable] = useState(true);

  const [hasTime, setHasTime] = useState(false);

  // const navigate = useNavigate();
  const { eventName } = useContext(UserContext)
  const [Participants, setParticipants] = useState([]);

  let conectionsTrys = 5;

  socket.on("connect_error", () => {
    if (conectionsTrys > 0) {
      if (conectionsTrys > 9) {
        // revert to polling
        socket.io.opts.transports = ["polling", "websocket"];
      }else if(conectionsTrys > 1){
        // revert to websocket
        socket.io.opts.transports = ["websocket", "polling"];
      }
    socket.disconnect();
    console.log("socket connect_error , try to connect again in 5 seconds");
    socket.connect();
    conectionsTrys--;
    } else {
      console.log("socket connect_error");
      socket.disconnect();
      setButtonEnable(true);
    }
  });

  socket.on("disconnect", () => {
    console.log("socket disconnected");
  });

  socket.on('connect', () => {
    if (conectionsTrys < 5) {
      conectionsTrys = 5;
    }
    console.log('Socket connected');
    socket.emit('my_message', 'Hello server from client');
  });

  socket.on('my_response', (data) => {
    console.log('server response ', data);
  });

  socket.on('time', (data) => {
    console.log('server time ', data);
    if(!hasTime){
      setHasTime(true);
    }
  });

  useEffect(() => {
    //codigo para cuando monta el compomente
    if (eventName !== '') {
      fetchParticipants(eventName).then((data) => setParticipants(data));
    }
    return () => {
      //codigo para cuando desmonta el compomente
      socket.disconnect()
    }
  }, [eventName])

  useEffect(() => {
    if(hasTime){
      fetchParticipants(eventName).then((data) => setParticipants(data));
      setHasTime(false);
    }
  }, [hasTime])

  const handleClick = (e) => {

    if (socket.connected) {
      socket.disconnect()
      setButtonEnable(true);
    } else {
      socket.connect()
      setButtonEnable(false);
    }
  }

  const drawTable = (data) => {
    if (data.length === 0) {
      return <h3>No hay participantes en este evento</h3>
    }
    let headersToRender = []
    for (let i = 0; i < 6; i++) {
      headersToRender.push(<TableCell key={i}>Tiempo {i + 1}</TableCell>)
    }
    headersToRender.push(<TableCell key={6}>Coche</TableCell>)
    headersToRender.push(<TableCell key={7}>Piloto</TableCell>)
    let rows = data.map((row, index) => {
      let cells = []
      let values = Object.values(row);
      for (let i = 0; i < values.length; i++) {
        if (i < 6) {
          if (values[i] === null) {
            cells.push(<TableCell key={i}>-</TableCell>)
          } else {
            cells.push(<TableCell key={i}>{JSON.stringify(values[i])}</TableCell>)
          }
        } else if (i === 6) {
          cells.push(<TableCell key={i}>{values[7].body}</TableCell>)
        } else if (i === 7) {
          cells.push(<TableCell key={i}>{values[7].user.name}</TableCell>)
        }
      }
      return <TableRow key={index}>{cells}</TableRow>
    })
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {headersToRender}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  return (
    <>
      <section className="Participants">
        <h3>Evento Selecionado : {eventName}</h3>
        {drawTable(Participants)}
        {socket.connected ? <h3>Conectado <Wifi fontSize="large" /></h3> : <h3>Desconectado <WifiOff fontSize="large" /></h3>}
        <Button variant="contained" onClick={handleClick} disabled={!buttonEnable}>
          {buttonEnable ? "Conectar" : "Desconectar"}
        </Button>
      </section>
    </>

  );
};

export default EventControl;