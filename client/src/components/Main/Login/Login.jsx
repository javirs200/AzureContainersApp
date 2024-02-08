import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const { setLoggedIn } = useContext(UserContext);

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

  useEffect(() => {
    function getCookie(key) {
      var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
      return b ? b.pop() : "";
    }
    const jsontoken = getCookie('access_token')
    console.log('cookie jwt->',jsontoken);
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const fetchUsers = async () => {
      const user = { email: email, password: password };
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
    };
    fetchUsers();
  };

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
        {emailMessage ? <span>{emailMessage}</span> : ""}
        <input
          name="password"
          type="password"
          className="input_form"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordMessage ? <span>{passwordMessage}</span> : ""}
        <input className="form_button" type="submit" value="Continuar" />
      </form>
    </section>
  );
};
export default Login;