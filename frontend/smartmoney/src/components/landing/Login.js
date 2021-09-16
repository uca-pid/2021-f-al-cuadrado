import React from 'react';
import {useState} from 'react';
import "./style.css";
import webStyles from "./webStyles";
import mobilStyles from "./mobilStyles";
import { useMediaQuery } from 'react-responsive';
import RequiredField from '../RequiredField/requiredField';

const Login = ({setLayoutForgotPassword,setLayoutRegister}) => {
    
  const isMobileDevice = useMediaQuery({
    query: "(max-device-width: 480px)",
  });
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [invalidCredentials, setInvalidCredentials] = useState('none');
    const [userEmpty, setUserEmpty] = useState(false);
    const [passwordEmpty, setPasswordEmpty] = useState(false);
   
    const login = () => {
      setInvalidCredentials('none')
      if(user==='')setUserEmpty(true);
      if(password==='')setPasswordEmpty(true);
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
          .catch(err => setInvalidCredentials('block'))
      }
    }

    const isEmpty = (input, isEmpty) => {
        if(input==='')isEmpty(true)
      }


    return(
        <div className="formContainer" name="Login">     
            <form className="form">
              <p className="invalidCredentials" style={{display:invalidCredentials}}>Credenciales incorrectas</p>
              <p className="label" >Usuario</p>
              <input style={isMobileDevice ? (userEmpty ? mobilStyles.inputEmpty : mobilStyles.input) : (userEmpty ? webStyles.inputEmpty : webStyles.input)} type="text" value={user} onChange={e => setUser(e.target.value)} onFocus={()=>setUserEmpty(false)} onBlur={()=>isEmpty(user,setUserEmpty)}/>
              {userEmpty&&<RequiredField/>}
              <p className="label" >Contraseña</p>
              <input style={isMobileDevice ? (passwordEmpty ? mobilStyles.inputEmpty : mobilStyles.input) : (passwordEmpty ? webStyles.inputEmpty : webStyles.input)} type="password" value={password} onChange={e => setPassword(e.target.value)} onFocus={()=>setPasswordEmpty(false)} onBlur={()=>isEmpty(password,setPasswordEmpty)}/>
              {passwordEmpty&&<RequiredField/>}
              <input style={isMobileDevice ? mobilStyles.forgotPassword : webStyles.forgotPassword} type="button" onClick={setLayoutForgotPassword} value="Olvidé mi contraseña" />
              <input 
                className = "button1"
                type="button" 
                onClick={login} 
                value="Iniciar sesión" 
                disabled={userEmpty||passwordEmpty}/>
              <div className="line"></div>
              <input 
                className = "button2"
                type="button" 
                onClick={setLayoutRegister} 
                value="Registrarse" />
            </form>
          </div> 
    )
}

export default Login;