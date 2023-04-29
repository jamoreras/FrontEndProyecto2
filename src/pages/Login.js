import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import '../styles/Login.css'
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import ValidacionTwilio from '../pages/ValidacionTwilio';

function Login() {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [newsSource, setNewsSource] = useState([]);
    const [token, setToken] = useState('');
    const [user, setUser] = useState('');
    const navigate = useNavigate();
    const [estado, setEstado] = useState('');

    localStorage.removeItem("user")
    localStorage.removeItem("token")

    const handlesubmit = (e) => {

        e.preventDefault();

        axios.post('http://localhost:4000/api/login',
            {
                'email': email,
                'password': pwd
            },
            {
                headers:
                    { 'Content-Type': 'application/json' }
            }).then(function (response) {

                console.log(response);

                if (response.data.message !== "Datos Incorrectos") {
                    // token = response.data.token
                    //localStorage.setItem('token', JSON.stringify(token));
                    // user = response.data.userId
                    //localStorage.setItem('user', JSON.stringify(user));

                    //navigate('/home');
                    setEstado(true);
                    setToken(response.data.token);
                    setUser(response.data.userId);

                } else {
                    alert("datos incorrectos")
                };
            });

    }



    return (

        <>
            {estado ? (
                <>
                    <ValidacionTwilio email={email} token={token} user={user}/>
                </>
            ) : (
                <>
                    <Form className='container col-lg-6 col-md-8 col-sm-12 p-5' onSubmit={handlesubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control type="text" placeholder="Enter Username" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-5" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={pwd} onChange={(e) => setPwd(e.target.value)} />
                        </Form.Group>
                        <Container className='d-grid gap-4 d-md-flex justify-content-md-center'>
                            <Button className='col-md-4' variant="primary" size="lg" type='submit'>
                                Ingresar
                            </Button>
                            <Button className='col-md-4' variant="secondary" size="lg">
                                Cancelar
                            </Button>
                        </Container> <br />

                        <p className='container col-lg-6 col-md-8 col-sm-12 p-4'> Si no tiene cuenta <a href="./registro" target="_blank" rel="noreferrer"> Registrese aqui</a></p>

                    </Form>
                </>

            )}


        </>

    )
}

export default Login
