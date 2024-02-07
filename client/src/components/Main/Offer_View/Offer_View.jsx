import React from "react";
import search_bar from "../../../assets/offers_View/Search.svg";
import download from "../../../assets/offers_View/download.svg";
import trash from "../../../assets/offers_View/trash.svg";
import filtro_propuestas from "../../../assets/offers_View/FiltroPropuestas.svg";
import propuesta1 from "../../../assets/offers_View/PropuestaListado.svg";
import propuesta2 from "../../../assets/offers_View/PropuestaListado1.svg";
import propuesta3 from "../../../assets/offers_View/PropuestaListado2.svg";
import propuesta4 from "../../../assets/offers_View/PropuestaListado3.svg";
import selector_propuesta from "../../../assets/offers_View/SelectorPropuestas.svg";

const Offer_View = () => {
  return (
    <div className="offer_view">
      <section className="search_bar">
        <img src={search_bar} alt="search" />
        <img className="selector" src={selector_propuesta} alt="selector" />
      </section>
      <section className="filters">
        <input type="checkbox" />
        <img src={filtro_propuestas} alt="filtro" />
        <section>
          <img className="boton" src={download} alt="download" />
          <img className="boton" src={trash} alt="trash" />
        </section>
      </section>
      <section className="offers">
        <img className="offer1" src={propuesta1} alt="perfil_1" />
        <img className="offer1" src={propuesta2} alt="perfil_2" />
        <img className="offer1" src={propuesta3} alt="perfil_3" />
        <img className="offer1" src={propuesta4} alt="perfil_4" />
      </section>
    </div>
  );
};

export default Offer_View;
