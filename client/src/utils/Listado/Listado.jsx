import React from "react";
import { v4 as uuidv4 } from "uuid";
import Elemento from "./Elemento";

const Listado = ({title,elementos,mode}) => {

  const drawList = () => {
    // console.log('eleementos -> ' , elementos);
    return elementos.map((el, i) => {
      // console.log('elemento ', el);
      return <Elemento key={uuidv4()} obj={el} mode={mode}/>
    })
  }

  return (
    <div className='listado'>
    {title ? <h2>{title}</h2>:''}
      {elementos ? <ul>{drawList()}</ul> : <p>No hay {title} todavia</p>}
    </div>
  );
};

export default Listado;