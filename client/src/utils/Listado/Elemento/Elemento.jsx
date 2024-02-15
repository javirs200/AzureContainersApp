import React from "react";

const Elemento = ({ obj }) => {

  return (
    <>
      {obj ? <div className="Elemento">
        {obj.toString()}
      </div> : ''}
    </>

  );
};

export default Elemento;
