import React, { useState, useEffect } from "react";
import Listado from '../../../utils/Listado'

const Users = () => {

  const [users, setUsers] = useState([]);

  const fetchUsers = () => {

    const fetchApi = async () => {
      try {

        const response = await fetch(`http://${import.meta.env.VITE_API_HOST}/api/users/`, {
          method: "GET",
          credentials: 'include',
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json()

        // console.log('todos los usuarios registrados ->', data);

        if(data){
          // console.log('users from fetch -> ',data);
          setUsers(data)
        }else{
          setUsers([
            {
              "name": "demo",
              "email": "demo@demo.com",
              "rol": "driver"
            }        
          ])
        }

      } catch {
        setUsers([
          {
            "name": "demo",
            "email": "demo@demo.com",
            "rol": "driver"
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
      
      <Listado title={'Usuarios'} elementos={users} />
    </>
  );
};

export default Users;
