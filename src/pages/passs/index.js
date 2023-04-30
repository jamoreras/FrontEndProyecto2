import { useState, useEffect } from "react";
import axios from 'axios';

function Passwordless() {
    const [email, setEmail] = useState("");
    localStorage.removeItem("user")
    localStorage.removeItem("token")
  const handleSubmit = () => {
    if (!email) {
        if (!email) {
            alert("Favor introducir un Email");
        }
    } else {
        axios.post("http://localhost:4000/api/passwor", {
            email: email,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            console.log(response.data)
            if (response.data.message !== "Datos Incorrectos") {
                alert("Verifique su correo");
            } else {
                alert("Datos Incorrectos")
            }
        }).catch(err => {//valida errores
            console.log("error: " + err);
            alert("Datos incorrectos");
        });

    };

  };


    return (
        <div >
          <div className="form-group">
            <label htmlFor="emailInput">Correo electrónico:</label>
                <input type="text" name="A1" onChange={ev => setEmail(ev.target.value)} placeholder="Email Address"></input> 
          </div>
          <button onClick={()=>handleSubmit()} type="submit" className="btn btn-primary">
            Enviar
          </button>
        </div>
      );
    }
export default Passwordless