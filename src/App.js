import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from "react";
import Home from './pages/Home';
import Login from './pages/Login';
import Registro from './pages/Registro';
import NewsSource from './pages/NewsSource';
import AdminPage from './pages/AdminPage';
import Category from './pages/Category';
import './App.css';
import Confirmar from './pages/Confirmar';
import ValidacionTwilio from './pages/ValidacionTwilio';
import SolicitudPass from './pages/passs/index';
import ConfimarPass from './pages/passs/Confirmar';

function App() {

  const [showNav, setShowNav] = useState(true);

  return (
    <BrowserRouter>
           {   showNav &&
                <nav>
                  {}
                </nav>
            } 

        <Routes>
          <Route>
            <Route index element={<Login funcNav={setShowNav}/>} />
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login/>} />
            <Route path='/registro' element={<Registro/>} />
            <Route path='/newsSource' element={<NewsSource/>} />
            <Route path='/adminPage' element={<AdminPage/>} />
            <Route path='/category' element={<Category/>} />
            <Route path='confirmar' element={<Confirmar/>}/>
            <Route path='/Passwordles/Solicitud' element={< SolicitudPass/>}/>
            <Route path='/passwordless' element={< ConfimarPass/>}/>

          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
