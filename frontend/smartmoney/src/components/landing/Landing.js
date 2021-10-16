import React from 'react';
import {useState} from 'react';
import logo from "../../images/logo.png"; 
import "./style.css"
import { useMediaQuery } from 'react-responsive';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';

const Landing = () => {

  const [layout, setLayout] = useState('login');

  function setForgotPasswordLayout(){
    setLayout('forgotPassword')
  }
  function setRegisterLayout(){
    setLayout('register')
  }
  function setLoginLayout(){
    setLayout('login')
  }

  return (
    <div className="body bodyLanding">
      <div className="menu">
        {(layout==='login')&&
         <Login setLayoutForgotPassword={setForgotPasswordLayout} setLayoutRegister={setRegisterLayout}/>
        }
        {(layout==='register')&&
          <Register setLayoutLogin={setLoginLayout}/>
        }
        {(layout==='forgotPassword')&&
          <ForgotPassword setLayoutLogin={setLoginLayout}/>
        }
      </div>
      <div className="logoDiv">
        <img src={logo} className="logo"/>
      </div>
    </div>
  );
}

export default Landing;