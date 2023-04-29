import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate,useLocation } from "react-router"
import axios from "axios";


function ValidacionTwilio(props) {
  const [codigo, setCodigo] = useState('');
  const navigate = useNavigate();
  const handleCodigoChange = (event) => {
    setCodigo(event.target.value);
  };
console.log(props.token)
console.log(props.user)
  const handleCodigoSubmit = () => {
    // Lógica para manejar el envío del código twilio
    axios.post("http://localhost:4000/api/login/verify", {
        email: props.email,
        codigo: parseInt(codigo)
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        console.log(response.data)
        if (response.data.message !== "Datos Incorrectos") {
             localStorage.setItem('token', JSON.stringify(props.token));
             localStorage.setItem('user', JSON.stringify(props.user));
            navigate("/home")
        } else {
            alert("Datos Incorrectos")
        }
    }).catch(err => {//valida errores
        console.log("error: " + err);
        alert("Datos incorrectos");
    });
  };

  return (
    <div className="d-flex flex-column align-items-center">
        <div><p class="fs-1">Ingrese el codigo Twilio</p></div>
      <input type="text" value={codigo} onChange={handleCodigoChange} className="form-control mb-3" />
      <button onClick={handleCodigoSubmit } className="btn btn-primary col-3 ">Capturar Código</button>
    </div>
  );
}

export default ValidacionTwilio;