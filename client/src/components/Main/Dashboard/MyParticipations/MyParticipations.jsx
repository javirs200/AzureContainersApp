import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../../context/userContext";
import FetchUtil from "../../../../utils/FetchUtil";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AssignmentIcon from '@mui/icons-material/Assignment';

const MyParticipations = () => {

    const { fetchMyParticipations } = FetchUtil;

    const { email } = useContext(UserContext)
    const [Participants, setParticipants] = useState([]);

    useEffect(() => {
        if (email !== '') {
            fetchMyParticipations(email).then((data) => setParticipants(data));
        }
      }, [])
    

    return (
        <div className="MyParticipations">
            <h2>Mis inscripciones</h2>
            <List>
                {Participants ? Participants.map((participation, index) => (
                    <ListItem key={index}>
                        <ListItemAvatar>
                            <Avatar>
                            <AssignmentIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={participation.event.name} secondary={participation.car.body} />
                    </ListItem>
                )) : <ListItem>Aun no estas inscrito en ningun evento</ListItem>}
            </List>
        </div>
    );
};

export default MyParticipations;