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

  switch (mode) {
    case 0:
      return (
        <li>
          {obj ? <div className="Elemento">
            {Object.values(obj).map(
              (e, i) => { if (i > 0) return <p key={uuidv4()}> {e.toString()}</p> }
            )}
          </div> : ''}
        </li>
      );
    case 1:
      return (
        <li>
          {obj ? <div className="Elemento">
            {Object.values(obj).map(
              (e) => { return <p key={uuidv4()}> {e.toString()} </p> }
            )}
          </div> : ''}
        </li>
      );
    case 2:
      return (
        <li>
          {obj ? <div className="Elemento" onClick={handleClickCar}>
            {Object.values(obj).map(
              (e, i) => { if (i > 0) return <p key={uuidv4()}> {e.toString()}</p> }
            )}
          </div> : ''}
        </li>
      );
    case 3:
      return (
        <li>
          {obj ? <div className="Elemento" onClick={handleClickevent}>
            {Object.values(obj).map(
              (e, i) => { if (i > 0) return <p key={uuidv4()}> {e.toString()}</p> }
            )}
          </div> : ''}
        </li>
      );
    default:
      return (
        <li>
          {obj ? <div className="Elemento">
            {Object.entries(obj).map(
              (e) => { return <p key={uuidv4()}> {e.toString()} </p> }
            )}
          </div> : ''}
        </li>
      );
  }
};

export default Elemento;
