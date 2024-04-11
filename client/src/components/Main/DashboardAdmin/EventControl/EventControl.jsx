import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../../context/userContext";

import Listado from '../../../../utils/Listado';

// import { v4 as uuidv4 } from "uuid";
// import { useNavigate } from "react-router-dom";
import FetchUtil from "../../../../utils/FetchUtil";

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

const EventControl = () => {

  const { fetchParticipants } = FetchUtil;

  // const navigate = useNavigate();
  const { eventName } = useContext(UserContext)
  const [Participants, setParticipants] = useState([]);

  useEffect(() => {
    if (eventName !== '') {
      fetchParticipants(eventName).then((data) => setParticipants(data));
    }
  }, [])

  const drawTable = (data) => {
    if (data.length === 0) {
      return <h3>No hay participantes en este evento</h3>
    }
    let headers = Object.keys(data[0]);
    let headersToRender = headers.map((header, index) => {
      return <TableCell key={index}>{header}</TableCell>
    })
    let rows = data.map((row, index) => {
      let values = Object.values(row);
      let cells = values.map((value, index) => {
        return <TableCell key={index}>{value}</TableCell>
      })
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
      </section>
    </>

  );
};

export default EventControl;