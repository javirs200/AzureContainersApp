import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../../context/userContext";
import FetchUtil from "../../../../utils/FetchUtil";

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
            <ul>
                {Participants ? Participants.map((participation,index) => (
                    <li key={index}><h2 className="inscription">{participation.event.name + ":" + participation.car.body}</h2>  </li>
                )): <li>Aun no estas inscrito en ningun evento</li>}
            </ul>
        </div>
    );
};

export default MyParticipations;