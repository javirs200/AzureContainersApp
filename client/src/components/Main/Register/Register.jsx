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
import FormHelperText from "@mui/material/FormHelperText";

const Register = () => {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    const [passwordMessage2, setPasswordMessage2] = useState("");
    const [role, setRole] = useState("");

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{6,}$/

    useEffect(() => {
        if (!passwordPattern.test(password1) && password1.length > 0) {
            setPasswordMessage("Password must contain lowecase, uppercase, digit and special character, and at least 6 caracters long");
        } else {
            setPasswordMessage("");
        }

    }, [password1])

    useEffect(() => {
        if (password2 != password1) {
            setPasswordMessage2("Passwords must be the same");
        } else {
            setPasswordMessage2("");
        }
    }, [password2, password1])

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
        const registerUser = async () => {

            const user = { email: email, password: password1, role: 'driver' }; // default role , not posible toregister as admin , admin user must elevate your privileges

            console.log(user);
        };
        registerUser();
    };

    return (
        <section>
            <form onSubmit={handleSubmit} className="form_register">

                <TextField sx={{ m: 2, width: '22ch' }} id="email" label="Email" variant="standard" onChange={(e) => setEmail(e.target.value)} />

                <FormControl sx={{ m: 2, width: '22ch' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        onChange={(e) => setPassword1(e.target.value)}
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        error={passwordMessage ? true : false}
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
                    <InputLabel htmlFor="standard-adornment-password" >Password</InputLabel>
                    <Input
                        onChange={(e) => setPassword2(e.target.value)}
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        error={passwordMessage2 ? true : false}
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

    

                <Button variant="contained" type="submit">Continuar</Button>
            </form>
        </section>
    )
};

export default Register;


