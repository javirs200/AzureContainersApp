import React, { useState, useEffect, useContext } from "react";
import Listado from '../../../../utils/Listado';
import { UserContext } from "../../../../context/userContext";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FetchUtil from "../../../../utils/FetchUtil";


const CarsManager = () => {

  const { fetchCars,addCar,removeCar } = FetchUtil;

  const [cars, setCars] = useState([]);
  const [Brand, setBrand] = useState('');
  const [Model, setModel] = useState('');
  const [Body, setBody] = useState('');

  const { email, carUuid, carName } = useContext(UserContext);

  useEffect(() => {
    fetchCars(email).then((data) => setCars(data));
  }, [])

  const handleSubmitCreate = (e) => {
    e.preventDefault()
    const createCar = async () => {
      const car = { 'email': email, 'carBrand': Brand, 'carModel': Model, 'carBody': Body }
      // console.log("coche para crear ", car);
      try {
        const response = await addCar(car);
        if (response.status === 200) {
          let data = await response.json()
          alert('coche creado')
          // console.log("ok create , data api -> ", data);
          fetchCars(email).then((data) => setCars(data));
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
        const response = removeCar(carUuid)
        if (response.status === 200) {
          let data = await response.json()
          alert('Coche borrado')
          // console.log("ok delete , data api -> ", data);
          fetchCars()
        } else {
          let data = await response.json()
          alert('error Coche no borrado')
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
