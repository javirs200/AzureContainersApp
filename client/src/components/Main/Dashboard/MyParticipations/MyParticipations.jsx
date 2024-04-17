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
            <h2>My Participations</h2>
            <ul>
                {Participants ? Participants.map((participation,index) => (
                    <li key={index}><h3>{participation.event.name + ":" + participation.car.body}</h3>  </li>
                )): <li>There are no participations</li>}
            </ul>
        </div>
    );
};

export default MyParticipations;