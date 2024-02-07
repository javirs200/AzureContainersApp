import React, { useContext } from "react";
import { Link } from 'react-router-dom'
import foto from "../../../assets/favicon.svg";
import { UserContext } from "../../../context/userContext";

const Nav = () => {
  const { logged } = useContext(UserContext)
  return (
    <nav>
      <img src={foto} alt="logo" className="logo_nav" />
      {logged ?
        <ul>
          <li><Link className={'link'} to='/home'>Inicio</Link></li>
          <li><Link className={'link'} to='/offer'>Propuestas</Link></li>
          <li><Link className={'link'} to='/users'>Usuarios</Link></li>
        </ul>
        : 
        <ul>
          <li><Link className={'link'} to='/users'>Usuarios</Link></li>
          <li><Link className={'link'} to='/login'>login</Link></li>
        </ul>
        }
    </nav>
  );
};

export default Nav;
