import React , { useEffect, useContext } from "react";
import { UserContext } from "../../context/userContext";

const Autologger = ({ component }) => {

    const { setLoggedIn } = useContext(UserContext);
    const { setRole,setEmail } = useContext(UserContext)

    useEffect(() => {

        // console.log('actualizacion');

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

        if (decoded) {
            setLoggedIn(true)
            // console.log("cookie rol ->",decoded.role);
            setRole(decoded.role)
            setEmail(decoded.email)
        } else {
            setLoggedIn(false)
        }
    }, [])

    return (
        component
    )
};

export default Autologger;