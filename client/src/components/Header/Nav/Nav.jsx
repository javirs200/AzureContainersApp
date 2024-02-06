import React from "react";
import { Link } from 'react-router-dom'
import foto from "../../../assets/favicon.svg";

const Nav = () => {
  return (
    <nav>
      <img src={foto} alt="logo" className="logo_nav" />
    <ul>
      <li><Link className={'link'} to='/home'>Inicio</Link></li>
      <li><Link className={'link'} to='/offer'>Propuestas</Link></li>
      <li><Link className={'link'} to='/users'>Usuarios</Link></li>
      <li>Perfil</li>
    </ul>    
    </nav>
  );
};

export default Nav;
