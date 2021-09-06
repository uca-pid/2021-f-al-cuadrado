import React from 'react';
import {useState} from 'react';
import ReactDOM from 'react-dom';
import logo from "./logo.png"; 
import "./style.css"
import webStyles from "./webStyles";
import mobilStyles from "./mobilStyles";
import { useMediaQuery } from 'react-responsive'

const Landing = () => {

  const isMobileDevice = useMediaQuery({
    query: "(max-device-width: 480px)",
  });

  const [layout, setLayout] = useState('login');

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [mail, setMail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [userForgotPassword, setUserForgotPassword] = useState('');
  const [codigoSeguridad, setCodigoSeguridad] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [codigoEnviado, setCodigoEnviado] = useState(false);

  const [buttom1Hover, setbuttom1Hover] = useState(false);
  const [buttom2Hover, setbuttom2Hover] = useState(false);
  const [updatePasswordHover, setUpdatePasswordHover] = useState(false);
  const [reenviarCodigo, setReenviarCodigo] = useState(false);

  function resetValues() {
    setUser('');
    setPassword('');
    setMail('');
    setName('');
    setSurname('');
    setRegisterPassword('');
    setUserForgotPassword('');
    setCodigoSeguridad('');
    setNewPassword('');

  }

  function login() {
    //#TODO: Login
    window.location.href = "./home"
  }
  function forgotPass() {
    resetValues();
    setLayout('forgotPassword')
  }
  function register() {
    setbuttom2Hover(false);
    resetValues();
    setLayout('register');
  }
  function registerSubmit() {
    //#TODO: Register
    window.location.href = "./home";
  }
  function forgotPasswordSubmit() {
    setCodigoEnviado(true);
    console.log('#TODO: forgotPass')
  }
  function updatePasswordSubmit() {
    console.log('#TODO: forgotPass')
  }
  function reenviarCodigoSubmit() {
    console.log('#TODO: forgotPass')
  }
  function returnLogin() {
    setbuttom2Hover(false);
    resetValues();
    setLayout('login');
  }

  function styleButton1(){
    if(buttom1Hover){
        return isMobileDevice ? mobilStyles.button1Hover : webStyles.button1Hover;
    }else{
        return isMobileDevice ? mobilStyles.button1 :webStyles.button1;
    }
  }
  function styleButton2(){
    if(buttom2Hover){
        return isMobileDevice ? mobilStyles.button2Hover : webStyles.button2Hover;
    }else{
        return isMobileDevice ? mobilStyles.button2 : webStyles.button2;
    }
  }
  function styleUpdatePassword(){
    if(updatePasswordHover){
        return isMobileDevice ? mobilStyles.button1Hover : webStyles.button1Hover;
    }else{
        return isMobileDevice ? mobilStyles.button1 : webStyles.button1;
    }
  }
  function styleReenviarCodigo(){
    if(reenviarCodigo){
        return isMobileDevice ? mobilStyles.button2Hover : webStyles.button2Hover;
    }else{
        return isMobileDevice ? mobilStyles.button2 : webStyles.button2;
    }
  }
  

  return (
    <div style={isMobileDevice ? mobilStyles.body : webStyles.body}>
      <div style={isMobileDevice ? mobilStyles.secondRow : webStyles.leftColumn}>
        {(layout==='login')&&
          <div style={isMobileDevice ? mobilStyles.formContainer : webStyles.formContainer} name="Login" class="menu">     
            <form style={isMobileDevice ? mobilStyles.form : webStyles.form}>
              <p style={isMobileDevice ? mobilStyles.label : webStyles.label}>Usuario</p>
              <input style={isMobileDevice ? mobilStyles.input : webStyles.input} type="text" value={user} onChange={e => setUser(e.target.value)} />
              <p style={isMobileDevice ? mobilStyles.label : webStyles.label}>Contraseña</p>
              <input style={isMobileDevice ? mobilStyles.input : webStyles.input} type="password" value={password} onChange={e => setPassword(e.target.value)} />
              <input style={isMobileDevice ? mobilStyles.forgotPassword : webStyles.forgotPassword} type="button" onClick={forgotPass} value="Olvidé mi contraseña" />
              <input 
                onMouseEnter={()=>{setbuttom1Hover(true);}} 
                onMouseLeave={()=>{setbuttom1Hover(false);}} 
                style={styleButton1()} 
                type="button" 
                onClick={login} 
                value="Iniciar sesión" />
              <div style={isMobileDevice ? mobilStyles.line : webStyles.line}></div>
              <input 
                onMouseEnter={()=>{setbuttom2Hover(true);}} 
                onMouseLeave={()=>{setbuttom2Hover(false);}} 
                style={styleButton2()}  
                type="button" 
                onClick={register} 
                value="Registrarse" />
            </form>
          </div> 
        }
        {(layout==='register')&&
          <div style={isMobileDevice ? mobilStyles.formContainer : webStyles.formContainer} name="Register" class="menu">     
            <form style={isMobileDevice ? mobilStyles.form : webStyles.form}>
              <p style={isMobileDevice ? mobilStyles.label : webStyles.label} >Mail</p>
              <input style={isMobileDevice ? mobilStyles.input : webStyles.input} type="text" value={mail} onChange={e => setMail(e.target.value)} />
              <p style={isMobileDevice ? mobilStyles.label : webStyles.label}>Nombre</p>
              <input style={isMobileDevice ? mobilStyles.input : webStyles.input} type="text" value={name} onChange={e => setName(e.target.value)} />
              <p style={isMobileDevice ? mobilStyles.label : webStyles.label}>Apellido</p>
              <input style={isMobileDevice ? mobilStyles.input : webStyles.input} type="text" value={surname} onChange={e => setSurname(e.target.value)} />
              <p style={isMobileDevice ? mobilStyles.label : webStyles.label}>Contraseña</p>
              <input style={isMobileDevice ? mobilStyles.input : webStyles.input} type="password" value={registerPassword} onChange={e => setRegisterPassword(e.target.value)} />
              <input 
                onMouseEnter={()=>{setbuttom1Hover(true);}} 
                onMouseLeave={()=>{setbuttom1Hover(false);}} 
                style={styleButton1()}  
                type="button" 
                onClick={registerSubmit} 
                value="Registrarse" />
              <div style={isMobileDevice ? mobilStyles.line : webStyles.line}></div>
              <input 
                onMouseEnter={()=>{setbuttom2Hover(true);}} 
                onMouseLeave={()=>{setbuttom2Hover(false);}} 
                style={styleButton2()} 
                type="button" 
                onClick={returnLogin} 
                value="Iniciar sesión" />
            </form>
          </div> 
        }
        {(layout==='forgotPassword')&&
          <div style={isMobileDevice ? mobilStyles.formContainer : webStyles.formContainer} name="ForgotPassword" class="menu">     
            <form style={isMobileDevice ? mobilStyles.form : webStyles.form}>
              <p style={isMobileDevice ? mobilStyles.label : webStyles.label}>Usuario</p>
              <input style={isMobileDevice ? mobilStyles.input : webStyles.input} type="text" value={userForgotPassword} onChange={e => setUserForgotPassword(e.target.value)} />
              {
                !codigoEnviado &&
                  <input 
                    onMouseEnter={()=>{setbuttom1Hover(true);}} 
                    onMouseLeave={()=>{setbuttom1Hover(false);}} 
                    style={styleButton1()}  
                    type="button" 
                    onClick={forgotPasswordSubmit} 
                    value="Enviar mail" />
              }
              {
                codigoEnviado &&
                <form style={isMobileDevice ? mobilStyles.formCode : webStyles.formCode}>
                    <p style={isMobileDevice ? mobilStyles.label : webStyles.label}>Código</p>
                    <input style={isMobileDevice ? mobilStyles.input : webStyles.input} type="text" value={codigoSeguridad} onChange={e => setCodigoSeguridad(e.target.value)} />
                    <p style={isMobileDevice ? mobilStyles.label : webStyles.label}>Nueva contraseña</p>
                    <input style={isMobileDevice ? mobilStyles.input : webStyles.input} type="text" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                    <input 
                      onMouseEnter={()=>{setUpdatePasswordHover(true);}} 
                      onMouseLeave={()=>{setUpdatePasswordHover(false);}} 
                      style={styleUpdatePassword()}  
                      type="button" 
                      onClick={updatePasswordSubmit} 
                      value="Actualizar contraseña" />
                    <div style={{height:10}}></div>
                    <input 
                      onMouseEnter={()=>{setReenviarCodigo(true);}} 
                      onMouseLeave={()=>{setReenviarCodigo(false);}} 
                      style={styleReenviarCodigo()} 
                      type="button" 
                      onClick={reenviarCodigoSubmit} 
                      value="Reenviar código" />
                  </form>
                  
              }
              <div style={isMobileDevice ? mobilStyles.line : webStyles.line}></div>
              <input 
                onMouseEnter={()=>{setbuttom2Hover(true);}} 
                onMouseLeave={()=>{setbuttom2Hover(false);}} 
                style={styleButton2()} 
                type="button" 
                onClick={returnLogin} 
                value="Volver" />
            </form>
          </div> 
        }
      </div>
      <div style={isMobileDevice ? mobilStyles.firstRow : webStyles.rightColumn}>
        <img src={logo} style={isMobileDevice ? mobilStyles.logo : webStyles.logo}/>
      </div>
    </div>
  );
}


export default Landing;
