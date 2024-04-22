import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FetchUtil from "../../../utils/FetchUtil/FetchUtil";
import { UserContext } from "../../../context/userContext";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const Login = () => {

  const { loginUser } = FetchUtil;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();
  const [emailField, setEmailField] = useState("");
  const [password, setPassword] = useState("");
  const { setLoggedIn, setRole,setEmail } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault()
    const login = async () => {
      const user = { email: emailField, password: password };
      // console.log("user data form form -> ", user);
      //peticion api para login con objeto usuario
      const response = await loginUser(user); 
      if (response.status === 200) {
        let data = await response.json()
        setLoggedIn(true);
        // console.log('datos respuesta ', data);
        setRole(data.role);
        setEmail(emailField);
        navigate("/dashboard");
      } else {
        alert("Datos de acceso incorrectos , intentelo de nuevo");
      }
    };
    login();
  };

  return (
    <section className="section_login">
      <h2>Inicia sesión</h2>
      <form onSubmit={handleSubmit} className="form_login">

        <TextField sx={{ m: 2, width: '22ch' }} id="email" label="Email" variant="standard" onChange={(e) => setEmailField(e.target.value)} />

        <FormControl sx={{ m: 2, width: '22ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Contraseña</InputLabel>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="ver Contraseña"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <br />
        <Button variant="contained" type="submit">Continuar</Button>
      </form>
    </section >
  );
};
export default Login;