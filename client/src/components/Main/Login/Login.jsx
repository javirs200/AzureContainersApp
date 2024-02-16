import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const { setLoggedIn, setRole } = useContext(UserContext);

  useEffect(() => {
    const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{9,}$/
    if (!passwordValidation.test(password) && password.length > 0) {
      setPasswordMessage("Password must contain lowecase, uppercase, digit and special character");
    } else {
      setPasswordMessage("");
    }
  }, [password])

  useEffect(() => {
    const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailValidation.test(email) && email.length > 0) {
      setEmailMessage("Email must have a valid format");
    } else {
      setEmailMessage("");
    }
  }, [email])

  const handleSubmit = (e) => {
    e.preventDefault()
    const loginUser = async () => {
      const user = { email: email, password: password };
      // console.log("user data form form -> ", user);
      //peticion api para login con objeto usuario
      const response = await fetch(`http://${import.meta.env.VITE_API_HOST}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(user),
      });
      if (response.status === 200) {
        let data = await response.json()
        setLoggedIn(true);
        // console.log('datos respuesta ', data);
        setRole(data.role);
        navigate("/dashboard");
      } else {
        alert("datos de acceso incorrectos , intentelo de nuevo");
      }
    };
    loginUser();
  };

  return (
    <section className="section_login">
      <h2>Inicia sesión</h2>
      <form onSubmit={handleSubmit} className="form_login">

        <TextField sx={{ m: 2, width: '22ch' }} id="email" label="Email" variant="standard" onChange={(e) => setEmail(e.target.value)} />

        <FormControl sx={{ m: 2, width: '22ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <Button variant="contained" type="submit">Continuar</Button>
      </form>
    </section >
  );
};
export default Login;