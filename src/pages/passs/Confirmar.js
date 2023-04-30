import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router"
import axios from "axios";

function Confirmar() {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const data = searchParams.get('data');
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    useEffect(() => {
        //:http://localhost:3000/passwordless?data=1626
        //console.log(correo);
        axios.post("http://localhost:4000/api/passwordless", {
            data: data
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            localStorage.setItem('token', JSON.stringify(response.data.token));
            localStorage.setItem('user', JSON.stringify(response.data.userId));
            console.log(response);
            navigate('/home');
        }).catch(err => {//valida errores
            console.log("error: " + err);
            alert("Datos Incorrectos");
            navigate("/login");
        });

    }, []);
    return (

        <div> </div>

    )

}
export default Confirmar
