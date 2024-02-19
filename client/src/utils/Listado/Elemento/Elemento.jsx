import React from "react";
import { v4 as uuidv4 } from "uuid";

const Elemento = ({ obj ,mode}) => {
  switch (mode) {
    case 0:
      return (
        <li>
          {obj ? <div className="Elemento">
            {Object.keys(obj).map(
              (e)=> {return <p key={uuidv4()}> {e.toString()} </p>}
            )}
          </div> : ''}
        </li>
      );
    case 1:
      return (
        <li>
          {obj ? <div className="Elemento">
            {Object.values(obj).map(
              (e)=> {return <p key={uuidv4()}> {e.toString()} </p>}
            )}
          </div> : ''}
        </li>
      );
    default:
      return (
        <li>
          {obj ? <div className="Elemento">
            {Object.entries(obj).map(
              (e)=> {return <p key={uuidv4()}> {e.toString()} </p>}
            )}
          </div> : ''}
        </li>
      );
  }
};

export default Elemento;
