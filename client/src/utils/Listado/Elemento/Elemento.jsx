import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../../../context/userContext";

const Elemento = ({ obj, mode }) => {

  const { setCarUuid, setEventUuid,setEventName,setCarName } = useContext(UserContext)

  const handleClickCar = () => {
    if (obj.uuid) {
      setCarUuid(obj.uuid)
      setCarName(obj.body)
    }
  }

  const handleClickevent = () => {
    if (obj.uuid) {
      setEventUuid(obj.uuid)
      setEventName(obj.name)
    }
  }

  let onClickHandler = null;
  let mapFunction = null;

  switch (mode) {
    case 1:
      mapFunction = (e, i) => { if (i > 0) return <p key={uuidv4()}> {e.toString()}</p> };
    case 2:
      mapFunction = (e, i) => { if (i > 0) return <p key={uuidv4()}> {e.toString()}</p> };
      break;
    case 3:
      mapFunction = (e, i) => { if (i > 0) return <p key={uuidv4()}> {e.toString()}</p> };
      break;
    default:
      mapFunction = (e) => { return <p key={uuidv4()}> {e.toString()} </p> };
      break;
  }

  switch (mode) {
    case 2:
      onClickHandler = handleClickCar;
      break;
    case 3:
      onClickHandler = handleClickevent;
      break;
  }

  return (
    <li>
      {obj ? <div className="Elemento" onClick={onClickHandler}>
        {Object.values(obj).map(mapFunction)}
      </div> : ''}
    </li>
  );

};

export default Elemento;
