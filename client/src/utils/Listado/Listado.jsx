import React from "react";
import { v4 as uuidv4 } from "uuid";
import Elemento from "./Elemento";

const Listado = (elementos) => {

  const drawList = () => {
    return elementos.map((el, i) => {
      return <Elemento key={uuidv4()} elemento={el} />
    })
  }

  return (
    <div className='listado'>
      {elementos ? drawList() : ''}
    </div>
  );
};

export default Listado;