import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoggedIn } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault()
    const fetchUsers = async () => {
      const user = { email: email, password: password };
      if (isValidEmail(email)) {
        //peticion api para login con objeto usuario
        const response = await fetch(`http://${import.meta.env.VITE_API_HOST}/api/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: 'include',
          body: JSON.stringify(user),
        });
        if (response.status === 200) {
          setLoggedIn(true);
          navigate("/home");
        } else {
          alert("datos de acceso incorrectos , intentelo de nuevo");
        }
      } else {
        alert(
          "Por favor, ingrese un correo electrónico y una contraseña válidos."
        );
      }
    };
    fetchUsers();
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  // const isValidPassword = (password) => {
  //   return password.length >= 6;
  // };

  return (
    <section className="form_login">
      <h2>Inicia sesión</h2>
      <form className="forms" onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          className="input_form"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          name="password"
          type="password"
          className="input_form"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input className="form_button" type="submit" value="Continuar"/>
      </form>
    </section>
  );
};
export default Login;
