import React from "react";
import UserCard from "./userCard/userCard";
import './listaUsers.css'

const ListaUsers = ({users}) => {

  const drawList = ()=>{

    // console.log(users);

    return users.map((el,index)=>{

      return <UserCard key={index} nombre={el.nombre} apellido={el.apellido} rol={el.rol} />

    })
      
  }
  
  return (
    <ul className="userList">
    {users ? drawList(): ''}
    </ul>
  );
};

export default ListaUsers;
