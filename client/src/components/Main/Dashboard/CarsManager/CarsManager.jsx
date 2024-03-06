import React, { useState, useEffect, useContext } from "react";
import Listado from '../../../../utils/Listado';
import { UserContext } from "../../../../context/userContext";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const CarsManager = () => {

  const [cars, setCars] = useState([]);
  const [Brand, setBrand] = useState('');
  const [Model, setModel] = useState('');
  const [Body, setBody] = useState('');

  const { email, carUuid, carName } = useContext(UserContext);

  // useEffect(() => { console.log('uuid coche -> ', carUuid); }, [carUuid])

  const fetchCars = () => {

    const fetchApi = async () => {
      try {

        const response = await fetch(`http://${import.meta.env.VITE_API_HOST}/api/cars/getfromUser/${email}`, {
          method: "GET",
          credentials: 'include',
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json()

        // console.log('todos los coches de ', email, ' -> ', data);

        if (data) {
          setCars(data)
        } else {
          setCars([])
        }
      } catch {
        setCars([])
      }
    }
    fetchApi();
  }

  useEffect(() => {
    fetchCars()
  }, [])

  const handleSubmitCreate = (e) => {
    e.preventDefault()
    const createCar = async () => {
      const car = { 'email': email, 'carBrand': Brand, 'carModel': Model, 'carBody': Body }
      // console.log("coche para crear ", car);
      try {
        const response = await fetch(`http://${import.meta.env.VITE_API_HOST}/api/cars/addtoUser`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: 'include',
          body: JSON.stringify(car),
        });
        if (response.status === 200) {
          let data = await response.json()
          alert('coche creado')
          // console.log("ok create , data api -> ", data);
          fetchCars()
        } else {
          let data = await response.json()
          alert('error')
          console.log("data api -> ", data);
        }

      } catch (error) {
        console.log(error);
      }
    }
    createCar()
  }

  const handleSubmitDelete = (e) => {
    e.preventDefault()
    const deleteUser = async () => {
      // console.log(edit);
      try {
        const response = await fetch(`http://${import.meta.env.VITE_API_HOST}/api/cars/remove`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: 'include',
          body: JSON.stringify({ 'uuid': carUuid }),
        });
        if (response.status === 200) {
          let data = await response.json()
          alert('usuario borrado')
          // console.log("ok delete , data api -> ", data);
          fetchCars()
        } else {
          let data = await response.json()
          alert('error usuario no borrado')
          console.log("data api -> ", data);
        }

      } catch (error) {
        console.log(error);
      }
    }
    deleteUser()

  }

  return (
    <>
      <section className="cars">
        <Listado title={'Mis Coches'} elementos={cars} mode={2} />
      </section>
      <section className="carsControls">
        <form onSubmit={handleSubmitCreate} className="form_add_car">
          <TextField sx={{ m: 2, width: '22ch' }} id="Brand" label="Marca" variant="standard" onChange={(e) => setBrand(e.target.value)} required />
          <TextField sx={{ m: 2, width: '22ch' }} id="Model" label="Chasis" variant="standard" onChange={(e) => setModel(e.target.value)} required />
          <TextField sx={{ m: 2, width: '22ch' }} id="Body" label="Carroceria" variant="standard" onChange={(e) => setBody(e.target.value)} required />
          <Button variant="contained" type="submit">Añadir</Button>
        </form>
        <h3>coche Selecionado : {carName}</h3>
        <form onSubmit={handleSubmitDelete} className="form_delete_car">
          <Button variant="outlined" type="submit" color="error">Borrar</Button>
        </form>
      </section> 
    </>

  );
};

export default CarsManager;
