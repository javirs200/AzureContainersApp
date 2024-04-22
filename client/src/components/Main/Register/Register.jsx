import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { UserContext } from "../../../context/userContext";
import FetchUtil from "../../../utils/FetchUtil/FetchUtil";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
// import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from "@mui/material/FormHelperText";

const Register = () => {

    const { fetchNewUser } = FetchUtil;

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [nameMessage, setNameMessage] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    const [passwordMessage2, setPasswordMessage2] = useState("");

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{6,}$/
    const namePattern = /^[a-zA-Z]{3,}$/
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    useEffect(() => {
        if (!passwordPattern.test(password1) && password1.length > 0) {
            setPasswordMessage("La contraseña debe contener minúsculas, mayúsculas, dígitos y caracteres especiales, y tener al menos 6 caracteres de longitud");
        } else {
            setPasswordMessage("");
        }

    }, [password1])

    useEffect(() => {
        if (password2 != password1) {
            setPasswordMessage2("Las contraseñas deben ser iguales");
        } else {
            setPasswordMessage2("");
        }
    }, [password2, password1])

    useEffect(() => {
        if (!emailPattern.test(email) && email.length > 0) {
            setEmailMessage("El email debe tener un formato válido");
        } else {
            setEmailMessage("");
        }
    }, [email])

    useEffect(() => {
        if (!namePattern.test(name) && name.length > 0) {
            setNameMessage("El nombre debe tener al menos 3 caracteres");
        } else {
            setNameMessage("");
        }
    }, [name])

    const handleSubmit = (e) => {
        e.preventDefault()
        const registerUser = async () => {

            try {
                const user = { name: name, email: email, password: password1 };

                // console.log(user);

                const response = await fetchNewUser(user);
                if (response.status === 200) {
                    let data = await response.json()
                    // console.log("ok register , data api -> ", data);
                    alert('usuario registrado ')
                } else {
                    let data = await response.json()
                    console.log("data api -> ", data);
                }
                navigate("/");
            } catch (error) {
                console.log(error);
            }
        };
        registerUser();
    };

    return (
        <section className="register_from">
            <h2>Registro</h2>
            <form onSubmit={handleSubmit} className="form_register">

                <FormControl sx={{ m: 2, width: '22ch' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-name">Nombre</InputLabel>
                    <Input
                        onChange={(e) => setName(e.target.value)}
                        id="standard-adornment-name"
                        error={nameMessage ? true : false}
                        required
                    />
                    {nameMessage ? <FormHelperText>{nameMessage}</FormHelperText> : ''}
                </FormControl>

                <FormControl sx={{ m: 2, width: '22ch' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
                    <Input
                        onChange={(e) => setEmail(e.target.value)}
                        id="standard-adornment-email"
                        error={emailMessage ? true : false}
                        required
                    />
                    {emailMessage ? <FormHelperText>{emailMessage}</FormHelperText> : ''}
                </FormControl>

                <FormControl sx={{ m: 2, width: '22ch' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">Contraseña</InputLabel>
                    <Input
                        onChange={(e) => setPassword1(e.target.value)}
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        error={passwordMessage ? true : false}
                        required
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
                    {passwordMessage ? <FormHelperText>{passwordMessage}</FormHelperText> : ''}
                </FormControl>


                <FormControl sx={{ m: 2, width: '22ch' }} variant="standard"  >
                    <InputLabel htmlFor="standard-adornment-password" >Contraseña</InputLabel>
                    <Input
                        onChange={(e) => setPassword2(e.target.value)}
                        id="standard-adornment-password2"
                        type={showPassword ? 'text' : 'password'}
                        error={passwordMessage2 ? true : false}
                        required
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
                    {passwordMessage2 ? <FormHelperText>{passwordMessage2}</FormHelperText> : ''}
                </FormControl>
                <br />
                <Button variant="contained" type="submit">Continuar</Button>
            </form>
        </section>
    )
};

export default Register;


