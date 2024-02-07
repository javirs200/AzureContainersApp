import React from "react";
import profile from '../../../../../assets/users_View/profile.svg'
import './userCard.css'

const UserCard = ({name,email,rol}) => {
  return <li className="userCard">
    <img className="profile" src={profile} alt="profile" />
    <p> <b> {name || 'Nombre' } {email || 'Email'}</b></p>
    <p>Rol: {rol}</p>
  </li>;
};

export default UserCard;
