import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../../context/userContext"
import FetchUtil from "../../../../utils/FetchUtil";

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

const EventTable = () => {

  const { fetchParticipants } = FetchUtil;

  // const navigate = useNavigate();
  const { eventName } = useContext(UserContext)
  const [Participants, setParticipants] = useState([]);

  useEffect(() => {
    if (eventName !== '') {
      fetchParticipants(eventName).then((data) => setParticipants(data));
    }
  }, [eventName])

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
        }else if(i === 6){  
          cells.push(<TableCell key={i}>{values[7].body}</TableCell>)
        }else if(i === 7){
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
      <section className="EventTable">
        {drawTable(Participants)}
      </section>
    </>

  );
};

export default EventTable;