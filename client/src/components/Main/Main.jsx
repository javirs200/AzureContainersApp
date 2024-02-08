import React,{useEffect,useContext} from "react";
import Login from "./Login/Login";
import Home from "./Home/Home";
import Offer_View from "./Offer_View/Offer_View";
import Users from "./Users/Users"
import { Route, Routes, Navigate } from "react-router-dom";
import RoleManager from "../../utils/RoleManager";
import ProtectedRoutes from "../../utils/ProtectedRoutes/ProtectedRoutes";
import { UserContext } from "../../context/userContext";


const Main = () => {

  const { setLoggedIn,logged } = useContext(UserContext);

  useEffect(() => {
    function getCookie(key) {
      var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
      return b ? b.pop() : "";
    }

    const parseJwt = (token) => {
      try {
        return JSON.parse(atob(token.split('.')[1]));
      } catch (e) {
        return null;
      }
    };

    const jsontoken = getCookie('access_token')
    const decoded = parseJwt(jsontoken)
    console.log('decoded token ',decoded);
    console.log(logged);
    if(decoded){
      setLoggedIn(true)
    }else{
      setLoggedIn(false)
    }
  }, [])

  return (
    <main>
        <Routes>

          <Route path="/login" element={logged ? <Navigate to={"/home"} /> : <Login/>} />
          <Route path="/home" element={logged ? <Home/> : <Navigate to={"/login"} />} />
          <Route path="/offer" element={logged ? <Offer_View/> : <Navigate to={"/login"} />} />          
          <Route path="/users" element={logged ? <Users/> : <Navigate to={"/login"} />} />

          <Route path="/*" element={logged ? <Navigate to={"/home"} /> : <Navigate to={"/login"} /> } />
        </Routes>
    </main>
  );
};

export default Main;
