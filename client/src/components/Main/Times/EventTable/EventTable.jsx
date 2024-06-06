import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../../context/userContext"
import FetchUtil from "../../../../utils/FetchUtil";
import formatter from "../../../../utils/formatter";

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
    headersToRender.push(<TableCell key={0}>Posicion</TableCell>)
    for (let i = 0; i < 6; i++) {
      headersToRender.push(<TableCell key={i}>Tiempo {i + 1}</TableCell>)
    }
    headersToRender.push(<TableCell key={6}>Tiempo total</TableCell>)
    headersToRender.push(<TableCell key={7}>Coche</TableCell>)
    headersToRender.push(<TableCell key={8}>Piloto</TableCell>)
    let rows = data.map((row, index) => {
      let cells = []
      let values = Object.values(row);
      // sconsole.log(values)
      cells.push(<TableCell key={'p'+index}>{index+1}</TableCell>)
      for (let i = 1; i <= values.length; i++) {
        if (i < 7) {
          cells.push(<TableCell key={i}>{values[i]}</TableCell>)
        }else if(i === 7){  
          cells.push(<TableCell key={i}>{formatter.formatMS(values[7])}</TableCell>)
        }else if(i === 9){  
          cells.push(<TableCell key={i}>{values[9].body}</TableCell>)
        }else if(i === 10){
          cells.push(<TableCell key={i}>{values[9].user.name}</TableCell>)
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