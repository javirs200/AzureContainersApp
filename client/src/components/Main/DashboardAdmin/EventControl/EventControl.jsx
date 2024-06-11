import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../../context/userContext";

import socket from "../../../../config/socket";

import FetchUtil from "../../../../utils/FetchUtil";

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material'
import { Wifi, WifiOff, DirectionsRun, Man } from '@mui/icons-material'

const EventControl = () => {

  const { fetchParticipants,fetchAddNewTime } = FetchUtil;
  const [buttonEnable, setButtonEnable] = useState(true);

  const [selectedParticipant, setSelectedParticipant] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [labelEnable, setLabelEnable] = useState(true);

  const [hasTime, setHasTime] = useState(false);

  const [connected, setConnected] = useState(false);

  // const navigate = useNavigate();
  const { eventName } = useContext(UserContext)
  const [Participants, setParticipants] = useState([]);

  const [started, setStarted] = useState(false);

  let conectionsTrys = 5;

  socket.on("connect_error", () => {
    if (conectionsTrys > 0) {
      if (conectionsTrys > 3) {
        // revert to polling
        socket.io.opts.transports = ["polling", "websocket"];
      } else if (conectionsTrys <= 3 && conectionsTrys > 0) {
        // revert to websocket
        socket.io.opts.transports = ["websocket", "polling"];
      }
      socket.disconnect();
      console.log('socket connect_error , trys remaining ', conectionsTrys, ' connect again in 5 seconds');
      socket.connect();
      conectionsTrys--;
      return
    } else {
      console.log("socket connect_error , no more trys");
      socket.disconnect();
      setButtonEnable(true);
      //dummy enable for demo
      setConnected(true);
      setButtonEnable(true);
      setStarted(false);
    }
  });

  socket.on("disconnect", () => {
    console.log("socket disconnected");
    setConnected(false);
  });

  socket.on('connect', () => {
    if (conectionsTrys < 5) {
      conectionsTrys = 5;
    }
    console.log('Socket connected');
    setConnected(true);
    setButtonEnable(true);
    setStarted(false);
  });

  socket.on('my_response', (data) => {
    console.log('server response ', data);
  });

  socket.on('new_time', (data) => {
    // console.log('server recive new time ', data);
    fetchAddNewTime(data.uuid, data.time, data.index).then((response) => console.log('response from server ', response));
    if (!hasTime) {
      setHasTime(true);
    } 


  });

  socket.on('tagScanned', (data) => {
    if (data) {
      // console.log('tag escaneado ', data);
      let id = data.tag.toString().split(':')[0];
      // console.log('id extraido ', id);
      let el = document.getElementById(id)
      // console.log('elemento encontrado ', el);
      if (el) {
        el.style.color = 'green';
        el.disabled = true;
      }
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
    if (hasTime) {
      fetchParticipants(eventName).then((data) => setParticipants(data));
      setHasTime(false);
    }
  }, [hasTime])

  const handleClick = (e) => {

    if (connected) {
      socket.disconnect()
      setButtonEnable(true);
      setConnected(false);
      setStarted(false);
    } else {
      socket.connect()
      setButtonEnable(false);
    }
  }

  const handleClickStart = (e) => {
    socket.emit('control', { event: eventName, command: 'start' });
    setLabelEnable(false);
    setStarted(true);
  }

  const handleClickScan = (e) => {
    socket.emit('scan', { selectedId});
    // console.log('scan send ', selectedParticipant , selectedId);
    setLabelEnable(false);
    setSelectedParticipant('');
  }

  const handleClickSelectParticipant = (id,name) => {
    // console.log('selected participant', id);
    setSelectedId(id);
    setSelectedParticipant(name);
    setLabelEnable(true);
  }

  const drawTable = (data) => {
    if (data.length === 0) {
      return <h3>No hay participantes en este evento</h3>
    }
    if (data.msj) {
      return <h3>error interno vuelve al inicio</h3>
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
      for (let i = 1; i <= values.length; i++) {
        if (i < 7) {
          if(values[i] === null){
            cells.push(<TableCell key={i}>--:--:--</TableCell>)
          }else{          
            cells.push(<TableCell key={i}>{values[i]}</TableCell>)
          }
        } else if (i === 9) {
          cells.push(<TableCell key={i} onClick={()=>{handleClickSelectParticipant(values[0],values[9].body)}}>
          <Button variant="outlined" className="participantBtn" id={values[0]}>{values[9].body}</Button>
          </TableCell>)
        } else if (i === 10) {
          cells.push(<TableCell key={i} >{values[9].user.name}</TableCell>)
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
        <section className="eventMainControls">
          <div className="conectionStatus">
            {connected ? <h3>Conectado <Wifi fontSize="large" /></h3> : <h3>Desconectado <WifiOff fontSize="large" /></h3>}
            <Button variant="contained" onClick={handleClick} disabled={!buttonEnable}>
              {!connected ? "Conectar" : "Desconectar"}
            </Button>
          </div>
          <div className="remoteOperations">
            {!started ? <h3>Configurando <Man fontSize="large" /></h3> : <h3>Listo <DirectionsRun fontSize="large" /></h3>}
            <Button variant="contained" onClick={handleClickStart} disabled={!connected || started}>
              Iniciar
            </Button>
            <Button variant="contained" onClick={handleClickScan} disabled={!connected || started || !labelEnable}>
              Escanear
            </Button>
            {selectedParticipant && labelEnable && connected ? <h3>Seleccionado : {selectedParticipant}</h3> : ''}
          </div>
        </section>
      </section>
    </>
  );
};

export default EventControl;