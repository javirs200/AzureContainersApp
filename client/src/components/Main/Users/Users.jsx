import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import ListaUsers from "./listaUsers/listaUsers";

const Users = () => {

  const [users, setUsers] = useState([]);

  const fetchUsers = () => {

    const fetchApi = async () => {
      try {

        const response = await fetch(`http://${import.meta.env.VITE_API_HOST}/api/users/all`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json()

        // console.log('todos los usuarios registrados ->', data);

        setUsers(data)

      } catch {
        setUsers([
          {
            "id_usuario": "53ebfc78-a38d-44d8-92a1-3d4ea6e83f5f",
            "nombre": "admin",
            "apellido": "super",
            "email": "admin@admin.com",
            "password": "$2a$10$vWb5PzXGb.8QjaLBs6qq5eYZU.NzC.qA1hIf.b5gRqaMB7N40/t6i",
            "rol": "administrador"
          },
          {
            "id_usuario": "f9888c2d-74e5-448d-a5ff-6109036d92bb",
            "nombre": "asesor",
            "apellido": "normal",
            "email": "asesor@asesor.com",
            "password": "$2a$10$oqm03S/7DX/6mhKGOgS9xeC98nqpLIyOlyE3pFgl69QD1JNor7Xjq",
            "rol": "asesor"
          },
          {
            "id_usuario": "d1c4ba9d-328c-4a22-942d-2df4907e2e2c",
            "nombre": "anonimo",
            "apellido": "anonimo",
            "email": "anonimo@anonimo.com",
            "password": "$2a$10$XP04pyw1ogbbFZZZ/XU3r.68Kwm3ZHZIuaMgYURp.y0zczIjIb4Oa",
            "rol": "asesor"
          }
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
      <Nav />
      <ListaUsers users={users} />
    </>
  );
};

export default Users;
