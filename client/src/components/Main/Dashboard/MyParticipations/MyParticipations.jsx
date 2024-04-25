import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../../context/userContext";
import FetchUtil from "../../../../utils/FetchUtil";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const MyParticipations = () => {

    const { fetchMyParticipations,fetchDeleteParticipation } = FetchUtil;

    const { email } = useContext(UserContext)
    const [Participants, setParticipants] = useState([]);

    useEffect(() => {
        if (email !== '') {
            fetchMyParticipations(email).then((data) => setParticipants(data));
        }
    }, [])

    const handleDelete = (participation) => async () => {
        
        const response = await fetchDeleteParticipation(participation);

        if (response.status === 200) {
            const newParticipants = Participants.filter((participant) => participant !== participation);
            setParticipants(newParticipants);
        }
    }


    return (
        <div className="MyParticipations">
            <h2>Mis inscripciones</h2>
            <List>
                {Participants.length > 0 ? Participants.map((participation, index) => (
                    <ListItem key={index}>
                        <ListItemAvatar>
                            <Avatar>
                                <AssignmentIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={participation.event.name} secondary={participation.car.body} />
                        <IconButton edge="end" aria-label="delete" onClick={handleDelete(participation)}>
                            <DeleteIcon/>
                        </IconButton>
                    </ListItem>
                )) : <ListItem>Aun no estas inscrito en ningun evento</ListItem>}
            </List>
        </div>
    );
};

export default MyParticipations;