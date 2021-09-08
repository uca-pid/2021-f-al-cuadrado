import React from 'react';
import {useState} from 'react';
import ReactDOM from 'react-dom';
import logo from "./logo.png"; 
import "./style.css"
import webStyles from "./webStyles";
import mobilStyles from "./mobilStyles";
import { useMediaQuery } from 'react-responsive';
import RequiredField from '../RequiredField/requiredField';

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
  const [forgotPassUserId, setForgotPassUserId] = useState('');
  const [codigoSeguridad, setCodigoSeguridad] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [codigoEnviado, setCodigoEnviado] = useState(false);

  const [buttom1Hover, setbuttom1Hover] = useState(false);
  const [buttom2Hover, setbuttom2Hover] = useState(false);
  const [updatePasswordHover, setUpdatePasswordHover] = useState(false);
  const [reenviarCodigo, setReenviarCodigo] = useState(false);

  const [loginUserEmpty, setLoginUserEmpty] = useState(false);
  const [loginPasswordEmpty, setLoginPasswordEmpty] = useState(false);
  const [registerUserInvalid, setRegisterUserInvalid] = useState(false);
  const [registerNameEmpty, setRegisterNameEmpty] = useState(false);
  const [registerSurnameEmpty, setRegisterSurnameEmpty] = useState(false);
  const [forgotUserEmpty, setForgotUserEmpty] = useState(false);
  const [forgotCodeEmpty, setForgotCodeEmpty] = useState(false);

  const [loginInvalidCredentials, setLoginInvalidCredentials] = useState(false);
  const [forgotInvalidUser, setForgotInvalidUser] = useState(false);
  const [forgotInvalidCredentials, setForgotInvalidCredentials] = useState(false);

  const [registerInvalidPassword, setRegisterInvalidPassword] = useState(false);
  const [forgotInvalidPassword, setForgotInvalidPassword] = useState(false);


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
    setForgotPassUserId('');
  }

  function login() {
    setLoginInvalidCredentials(false)
    if(user==='')setLoginUserEmpty(true);
    if(password==='')setLoginPasswordEmpty(true);
    if(!(user===''||password==='')){
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user, password: password})
      };
      fetch('https://smart-money-back.herokuapp.com/login/', requestOptions)
        .then(response => response.json())
        .then(data => {
          localStorage.setItem('session',JSON.stringify(data));
          window.location.href = "./home"
        })
        .catch(err => setLoginInvalidCredentials(true))
    }
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
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!re.test(mail))setRegisterUserInvalid(true);
    if(name==='')setRegisterNameEmpty(true);
    if(surname==='')setRegisterSurnameEmpty(true);
    if(password==='')setRegisterInvalidPassword(true);
    if(!(!re.test(mail)||name===''||surname===''||registerPassword===''||registerInvalidPassword)){
      const requestOptionsRegister = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ first_name: name, last_name: surname, email: mail, password: registerPassword})
      };
      console.log(requestOptionsRegister.body)
      fetch('https://smart-money-back.herokuapp.com/register/', requestOptionsRegister)
        .then((response) => {
          if(response.status===201){
            const requestOptionsLogin = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: mail, password: registerPassword})
            };
            fetch('https://smart-money-back.herokuapp.com/login/', requestOptionsLogin)
              .then(response => response.json())
              .then(data => {
                localStorage.setItem('session',JSON.stringify(data));
                window.location.href = "./home"
              })
          }
        })
    }
  }
  function forgotPasswordSubmit() {
    setForgotInvalidUser(false)
    setForgotInvalidCredentials(false)
    if(userForgotPassword===''){
      setForgotUserEmpty(true);
    }else{
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userForgotPassword})
      };
      fetch('https://smart-money-back.herokuapp.com/forgotPassword/', requestOptions)
        .then((response) => response.json())
        .then(data => {
          setForgotPassUserId(data.user_id);
          setCodigoEnviado(true);
        })
        .catch(err => setForgotInvalidUser(true))
    }

  }
  function updatePasswordSubmit() {
    setForgotInvalidUser(false)
    setForgotInvalidCredentials(false)
    if(codigoSeguridad==='')setForgotCodeEmpty(true);
    if(newPassword==='')setForgotInvalidPassword(true);
    if(!(codigoSeguridad===''||newPassword===''||forgotInvalidPassword)){
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ new_password: newPassword, code: codigoSeguridad})
      };
      fetch('https://smart-money-back.herokuapp.com/forgotPassword/'+forgotPassUserId+'/', requestOptions)
      .then((response) => {
        if(response.status===200){
          window.location.href = "./"
        }else{
          setForgotInvalidCredentials(true)
        }
      })
    }
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

  function isValidEmail(mail,setInvalid){
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!re.test(mail))setInvalid(true);
  }

  function isValidPassword(password, setInvalid){
    if(!passwordSyntax(password))setInvalid(true);
  }

  function isEmpty(input, isEmpty){
    if(input==='')isEmpty(true)
  }

  function passwordSyntax(password){
    const hasNumber = /\d/; 
    const hasLower = /[a-z]/;
    const hasUpper = /[A-Z]/;
    return (hasNumber.test(password)&&hasLower.test(password)&&hasUpper.test(password)&&(password.length>7))
  }
  

  return (
    <div style={isMobileDevice ? mobilStyles.body : webStyles.body}>
      <div style={isMobileDevice ? mobilStyles.secondRow : webStyles.leftColumn}>
        {(layout==='login')&&
          <div style={isMobileDevice ? mobilStyles.formContainer : webStyles.formContainer} name="Login">     
            <form style={isMobileDevice ? mobilStyles.form : webStyles.form}>
              <p style={loginInvalidCredentials ? (isMobileDevice ? mobilStyles.invalidCredentials : webStyles.invalidCredentials):{display:'none'}}>Credenciales incorrectas</p>
              <p style={isMobileDevice ? mobilStyles.label : webStyles.label}>Usuario</p>
              <input style={isMobileDevice ? (loginUserEmpty ? mobilStyles.inputEmpty : mobilStyles.input) : (loginUserEmpty ? webStyles.inputEmpty : webStyles.input)} type="text" value={user} onChange={e => setUser(e.target.value)} onFocus={()=>setLoginUserEmpty(false)} onBlur={()=>isEmpty(user,setLoginUserEmpty)}/>
              {loginUserEmpty&&<RequiredField/>}
              <p style={isMobileDevice ? mobilStyles.label : webStyles.label}>Contraseña</p>
              <input style={isMobileDevice ? (loginPasswordEmpty ? mobilStyles.inputEmpty : mobilStyles.input) : (loginPasswordEmpty ? webStyles.inputEmpty : webStyles.input)} type="password" value={password} onChange={e => setPassword(e.target.value)} onFocus={()=>setLoginPasswordEmpty(false)} onBlur={()=>isEmpty(password,setLoginPasswordEmpty)}/>
              {loginPasswordEmpty&&<RequiredField/>}
              <input style={isMobileDevice ? mobilStyles.forgotPassword : webStyles.forgotPassword} type="button" onClick={forgotPass} value="Olvidé mi contraseña" />
              <input 
                onMouseEnter={()=>{setbuttom1Hover(true);}} 
                onMouseLeave={()=>{setbuttom1Hover(false);}} 
                style={styleButton1()} 
                type="button" 
                onClick={login} 
                value="Iniciar sesión" 
                disabled={loginUserEmpty||loginPasswordEmpty}/>
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
          <div style={isMobileDevice ? mobilStyles.formContainer : webStyles.formContainer} name="Register">     
            <form style={isMobileDevice ? mobilStyles.form : webStyles.form}>
              <p style={isMobileDevice ? mobilStyles.label : webStyles.label} >Mail</p>
              <input style={isMobileDevice ? (registerUserInvalid ? mobilStyles.inputEmpty : mobilStyles.input) : (registerUserInvalid ? webStyles.inputEmpty : webStyles.input)} type="text" value={mail} onChange={e => setMail(e.target.value)} onFocus={()=>setRegisterUserInvalid(false)} onBlur={()=>isValidEmail(mail,setRegisterUserInvalid)}/>
              {registerUserInvalid&&<p style={isMobileDevice ? mobilStyles.invalidCredentials : webStyles.invalidCredentials}>Mail incorrecto</p>}
              <p style={isMobileDevice ? mobilStyles.label : webStyles.label}>Nombre</p>
              <input style={isMobileDevice ? (registerNameEmpty ? mobilStyles.inputEmpty : mobilStyles.input) : (registerNameEmpty ? webStyles.inputEmpty : webStyles.input)} type="text" value={name} onChange={e => setName(e.target.value)} onFocus={()=>setRegisterNameEmpty(false)} onBlur={()=>isEmpty(name,setRegisterNameEmpty)}/>
              {registerNameEmpty&&<RequiredField/>}
              <p style={isMobileDevice ? mobilStyles.label : webStyles.label}>Apellido</p>
              <input style={isMobileDevice ? (registerSurnameEmpty ? mobilStyles.inputEmpty : mobilStyles.input) : (registerSurnameEmpty ? webStyles.inputEmpty : webStyles.input)} type="text" value={surname} onChange={e => setSurname(e.target.value)} onFocus={()=>setRegisterSurnameEmpty(false)} onBlur={()=>isEmpty(surname,setRegisterSurnameEmpty)}/>
              {registerSurnameEmpty&&<RequiredField/>}
              <p style={isMobileDevice ? mobilStyles.label : webStyles.label}>Contraseña</p>
              <input style={isMobileDevice ? (registerInvalidPassword ? mobilStyles.inputEmpty : mobilStyles.input) : (registerInvalidPassword ? webStyles.inputEmpty : webStyles.input)} type="password" value={registerPassword} onChange={e => setRegisterPassword(e.target.value)} onFocus={()=>setRegisterInvalidPassword(false)} onBlur={()=>isValidPassword(registerPassword,setRegisterInvalidPassword)}/>
              {registerInvalidPassword&&<p style={isMobileDevice ? mobilStyles.invalidCredentials : webStyles.invalidCredentials}>La contraseña debe tener minimo 8 caracteres, 1 número, 1 mayúscula y 1 minúscula</p>}
              <input 
                onMouseEnter={()=>{setbuttom1Hover(true);}} 
                onMouseLeave={()=>{setbuttom1Hover(false);}} 
                style={styleButton1()}  
                type="button" 
                onClick={registerSubmit} 
                value="Registrarse" 
                disabled={registerUserInvalid||registerNameEmpty||registerSurnameEmpty||registerInvalidPassword}/>
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
          <div style={isMobileDevice ? mobilStyles.formContainer : webStyles.formContainer} name="ForgotPassword">     
            <form style={isMobileDevice ? mobilStyles.form : webStyles.form}>
              <p style={forgotInvalidUser ? (isMobileDevice ? mobilStyles.invalidCredentials : webStyles.invalidCredentials):{display:'none'}}>El usuario ingresado no existe</p>
              <p style={forgotInvalidCredentials ? (isMobileDevice ? mobilStyles.invalidCredentials : webStyles.invalidCredentials):{display:'none'}}>Código incorrecto</p>
              <p style={isMobileDevice ? mobilStyles.label : webStyles.label}>Usuario</p>
              <input style={isMobileDevice ? (forgotUserEmpty ? mobilStyles.inputEmpty : mobilStyles.input) : (forgotUserEmpty ? webStyles.inputEmpty : webStyles.input)} type="text" value={userForgotPassword} onChange={e => setUserForgotPassword(e.target.value)} onFocus={()=>setForgotUserEmpty(false)} onBlur={()=>isEmpty(userForgotPassword,setForgotUserEmpty)}/>
              {forgotUserEmpty&&<RequiredField/>}
              {
                !codigoEnviado &&
                  <input 
                    onMouseEnter={()=>{setbuttom1Hover(true);}} 
                    onMouseLeave={()=>{setbuttom1Hover(false);}} 
                    style={styleButton1()}  
                    type="button" 
                    onClick={forgotPasswordSubmit} 
                    value="Enviar mail" 
                    disabled={forgotUserEmpty}/>
                  
              }
              
              {
                codigoEnviado &&
                <form style={isMobileDevice ? mobilStyles.formCode : webStyles.formCode}>
                    <p style={isMobileDevice ? mobilStyles.label : webStyles.label}>Código</p>
                    <input style={isMobileDevice ? (forgotCodeEmpty ? mobilStyles.inputEmpty : mobilStyles.input) : (forgotCodeEmpty ? webStyles.inputEmpty : webStyles.input)} type="text" value={codigoSeguridad} onChange={e => setCodigoSeguridad(e.target.value)} onFocus={()=>setForgotCodeEmpty(false)} onBlur={()=>isEmpty(codigoSeguridad,setForgotCodeEmpty)}/>
                </form>
              }
              {(codigoEnviado&&forgotCodeEmpty)&&<RequiredField/>}
              { codigoEnviado &&
                  <form style={isMobileDevice ? mobilStyles.formCode : webStyles.formCode}>
                    <p style={isMobileDevice ? mobilStyles.label : webStyles.label}>Nueva contraseña</p>
                    <input style={isMobileDevice ? (forgotInvalidPassword ? mobilStyles.inputEmpty : mobilStyles.input) : (forgotInvalidPassword ? webStyles.inputEmpty : webStyles.input)} type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} onFocus={()=>setForgotInvalidPassword(false)} onBlur={()=>isValidPassword(newPassword, setForgotInvalidPassword)}/>
                  </form>
              }
              {forgotInvalidPassword&&<p style={isMobileDevice ? mobilStyles.invalidCredentials : webStyles.invalidCredentials}>La contraseña debe tener minimo 8 caracteres, 1 número, 1 mayúscula y 1 minúscula</p>}
              { codigoEnviado &&
                  <form style={isMobileDevice ? mobilStyles.formCode : webStyles.formCode}>
                    <input 
                      onMouseEnter={()=>{setUpdatePasswordHover(true);}} 
                      onMouseLeave={()=>{setUpdatePasswordHover(false);}} 
                      style={styleUpdatePassword()}  
                      type="button" 
                      onClick={updatePasswordSubmit} 
                      value="Actualizar contraseña" 
                      disabled={forgotUserEmpty||forgotCodeEmpty||forgotInvalidPassword}/>
                    <div style={{height:10}}></div>
                    <input 
                      onMouseEnter={()=>{setReenviarCodigo(true);}} 
                      onMouseLeave={()=>{setReenviarCodigo(false);}} 
                      style={styleReenviarCodigo()} 
                      type="button" 
                      onClick={forgotPasswordSubmit} 
                      value="Reenviar código"
                      disabled={forgotUserEmpty}/>
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
