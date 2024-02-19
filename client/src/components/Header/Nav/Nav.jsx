import React, { useContext } from "react";
import { Link } from 'react-router-dom'
import foto from "../../../assets/favicon.svg";
import { UserContext } from "../../../context/userContext";

const Nav = () => {
  const { logged, role } = useContext(UserContext);
  return (
    <nav>
      <img src={foto} alt="logo" className="logo_nav" />
      {logged ?
        role == 'admin' ?
          <ul>
            <li><Link className={'link'} to='/landing'>Inicio</Link></li>
            <li><Link className={'link'} to='/users'>Usuarios</Link></li>
            <li><Link className={'link'} to='/register'>Register</Link></li>
          </ul>
          :
          <ul>
            <li><Link className={'link'} to='/landing'>Inicio</Link></li>
            <li>Mis Coches</li>
            <li>Pruebas</li>
          </ul>
        :
        <ul>
          <li><Link className={'link'} to='/login'>login</Link></li>
          <li>Tiempos</li>
        </ul>
      }
    </nav>
  );
};

export default Nav;
