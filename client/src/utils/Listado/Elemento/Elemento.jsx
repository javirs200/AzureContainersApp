import React,{useContext} from "react";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../../../context/userContext";

const Elemento = ({ obj, mode }) => {

  const {setCarUuid} = useContext(UserContext)

  const handleClick = ()=>{
    if(obj.uuid){
      setCarUuid(obj.uuid)
    }
  }

  switch (mode) {
    case 0:
      return (
        <li>
          {obj ? <div className="Elemento">
            {Object.keys(obj).map(
              (e) => { return <p key={uuidv4()}> {e.toString()} </p> }
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
          {obj ? <div className="Elemento" onClick={handleClick}>
            {Object.values(obj).map(
              (e,i) => { if(i>0) return <p key={uuidv4()}> {e.toString()}</p> }
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
