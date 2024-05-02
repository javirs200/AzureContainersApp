import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../../context/userContext";

import socket from "../../../../config/socket";

import FetchUtil from "../../../../utils/FetchUtil";

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material'

const EventControl = () => {

  const { fetchParticipants } = FetchUtil;
  const [conected, setConected] = useState(false);
  const [buttonText, setButtonText] = useState("Conectar");

  const[hasTime, setHasTime] = useState(false);

  // const navigate = useNavigate();
  const { eventName } = useContext(UserContext)
  const [Participants, setParticipants] = useState([]);

  socket.on("connect_error", () => {
    // revert to classic upgrade
    console.log("socket conect error , socker obj -> ", socket);
    socket.io.opts.transports = ["polling", "websocket"];
  });

  socket.on("disconnect", () => {
    console.log("socket disconnected");
    setConected(false);
  });

  socket.on('connect', () => {
    console.log('Socket connected');
    setConected(true);
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
      hasTime = false;
    }
  }, [hasTime])

  const handleClick = (e) => {
    if (conected) {
      socket.disconnect()
      setButtonText("Conectar")
    } else {
      socket.connect()
      setButtonText("Desconectar")
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
        {conected ? <h3>Conectado</h3> : <h3>Desconectado</h3>}
        <Button variant="contained" onClick={handleClick}>
          {buttonText}
        </Button>
      </section>
    </>

  );
};

export default EventControl;