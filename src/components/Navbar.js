import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from "react-bootstrap";
import { Outlet, Link, Navigate } from "react-router-dom";
import '../styles/Navbar.css'
import { useNavigate } from 'react-router-dom';

const NavbarUser = () => {
  const navigate = useNavigate();

  let user = JSON.parse(localStorage.getItem('user'));

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  useEffect(() => {
    if (user) {
       console.log("Bivenido")           
        
             

    } else {
       
        navigate("/")
    }

  }, []);



  return (
    <>

      <Navbar className="navBg" expand="lg">
        <Container>
          <p className="welcome">Bienvenido { }</p>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <ul className="navbar-nav bienvenidoNavBar d-none">
              <li className="nav-item dropdown me-auto mb-2 mb-lg-0">
                <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown"
                  aria-expanded="false">
                </a>
              </li>
            </ul>
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/home" className="Link">Home</Nav.Link>
              {user.role == "pro" ? (
                <Nav.Link as={Link} to="/category" className="Link">Category</Nav.Link>
              ) : (<p></p> )}
              <Nav.Link as={Link} to="/newsSource" className="Link">News Source</Nav.Link>
              <Nav.Link as={Link} onClick={() => logOut()} to="/login" className="Link">Logout</Nav.Link>
            </Nav>

          </Navbar.Collapse>
        </Container>
        <script src="Common.jsx" type="text/javascript" charset="utf-8"></script>
      </Navbar>

      <section>
        <Outlet></Outlet>
      </section>
    </>
  )
}

export default NavbarUser;