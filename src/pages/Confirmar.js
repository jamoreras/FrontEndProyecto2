import { useEffect } from "react"
import { useNavigate,useLocation } from "react-router"
import axios from "axios";

function Confirmar(){
const navigate = useNavigate();
const location = useLocation();
const searchParams = new URLSearchParams(location.search);
const correo = searchParams.get('data');

useEffect(() => {

    console.log(correo);
    axios.post("http://localhost:4000/api/users/verify", {
        email: correo
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        navigate('/login');

        console.log(response);
    }).catch(err => {//valida errores
        console.log("error: " + err);
        alert("Error");               
    });
    
      }, []);
return( 

<div> </div>

)

}
export default Confirmar
