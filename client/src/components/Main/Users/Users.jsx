import React, { useState, useEffect } from "react";
import ListaUsers from "./listaUsers/listaUsers";

const Users = () => {

  const [users, setUsers] = useState([]);

  const fetchUsers = () => {

    const fetchApi = async () => {
      try {

        const response = await fetch(`http://${import.meta.env.VITE_API_HOST}/api/users/`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json()

        // console.log('todos los usuarios registrados ->', data);

        setUsers(data)

      } catch {
        setUsers([
          {
            "name": "admin",
            "email": "admin@admin.com",
            "rol": "driver"
          },
          {
            "name": "admin2",
            "email": "admin2@admin.com",
            "rol": "driver"
          },
          {
            "name": "admin3",
            "email": "admin3@admin.com",
            "rol": "driver"
          },
         
        ])
      }

    }

    fetchApi();
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <>
      <ListaUsers users={users} />
    </>
  );
};

export default Users;
