import React, { useContext } from "react";
import { Link } from 'react-router-dom'
import foto from "../../../assets/favicon.svg";
import { UserContext } from "../../../context/userContext";

const Nav = () => {
  const { logged, role } = useContext(UserContext);
  return (
    <nav>
      <Link className={'link'} to='/landing'>
        <img src={foto} alt="logo" className="logo_nav" />
      </Link>
      {logged ?
        role == 'admin' ?
          <ul>
            <li><Link className={'link'} to='/landing'>Inicio</Link></li>
            <li><Link className={'link'} to='/users'>Usuarios</Link></li>
            <li><Link className={'link'} to='/events'>Eventos</Link></li>
          </ul>
          :
          <ul>
            <li><Link className={'link'} to='/landing'>Inicio</Link></li>
            <li><Link className={'link'} to='/myCars'>Mis Coches</Link></li>
          </ul>
        :
        <ul>
          <li><Link className={'link'} to='/login'>login</Link></li>
          <li><Link className={'link'} to='/register'>Registro</Link></li>
          <li><Link className={'link'} to='/times'>Tiempos</Link></li>
        </ul>
      }
    </nav>
  );
};

export default Nav;
