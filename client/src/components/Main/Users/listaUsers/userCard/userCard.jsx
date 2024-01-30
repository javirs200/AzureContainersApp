import React from "react";
import profile from '../../../../../assets/img/profile.svg'
import './userCard.css'

const UserCard = ({nombre,apellido,rol}) => {
  return <li className="userCard">
    <img className="profile" src={profile} alt="profile" />
    <p> <b> {nombre || 'Nombre' } {apellido || 'Apellido'}</b></p>
    <p>Rol: {rol}</p>
  </li>;
};

export default UserCard;
