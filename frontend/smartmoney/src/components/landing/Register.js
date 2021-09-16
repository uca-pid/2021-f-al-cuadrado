import React from 'react';
import {useState} from 'react';
import "./style.css";
import webStyles from "./webStyles";
import mobilStyles from "./mobilStyles";
import { useMediaQuery } from 'react-responsive';
import RequiredField from '../RequiredField/requiredField';
import isValidPassword from '../../functions/passwordFormatValidation';

const Register = ({setLayoutLogin}) => {

    const isMobileDevice = useMediaQuery({
        query: "(max-device-width: 480px)",
    });

    const [mail, setMail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');
    const [userInvalid, setUserInvalid] = useState(false);
    const [nameEmpty, setNameEmpty] = useState(false);
    const [surnameEmpty, setSurnameEmpty] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);

    const isValidEmail = (mail,setInvalid) => {
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!re.test(mail))setInvalid(true);
    }
    const isEmpty = (input, isEmpty) => {
        if(input==='')isEmpty(true)
      }

    const registerSubmit = () =>{
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!re.test(mail))setUserInvalid(true);
        if(name==='')setNameEmpty(true);
        if(surname==='')setSurnameEmpty(true);
        if(password==='')setInvalidPassword(true);

        if(!(!re.test(mail)||name===''||surname===''||password===''||invalidPassword)){
          const requestOptionsRegister = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ first_name: name, last_name: surname, email: mail, password: password})
          };
          fetch('https://smart-money-back.herokuapp.com/register/', requestOptionsRegister)
            .then((response) => {
              if(response.status===201){
                const requestOptionsLogin = {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email: mail, password: password})
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

    return(
        <div className="formContainer" name="Register">     
            <form className="form">
                <p className="label" >Mail</p>
                <input style={isMobileDevice ? (userInvalid ? mobilStyles.inputEmpty : mobilStyles.input) : (userInvalid ? webStyles.inputEmpty : webStyles.input)} type="text" value={mail} onChange={e => setMail(e.target.value)} onFocus={()=>setUserInvalid(false)} onBlur={()=>isValidEmail(mail,setUserInvalid)}/>
                {userInvalid&&
                    <p className="invalidCredentials" style={isMobileDevice ? mobilStyles.invalidCredentials : webStyles.invalidCredentials}>Mail incorrecto</p>
                }
                <p className="label">Nombre</p>
                <input style={isMobileDevice ? (nameEmpty ? mobilStyles.inputEmpty : mobilStyles.input) : (nameEmpty ? webStyles.inputEmpty : webStyles.input)} type="text" value={name} onChange={e => setName(e.target.value)} onFocus={()=>setNameEmpty(false)} onBlur={()=>isEmpty(name,setNameEmpty)}/>
                {nameEmpty&&
                    <RequiredField/>
                }
                <p className="label">Apellido</p>
                <input style={isMobileDevice ? (surnameEmpty ? mobilStyles.inputEmpty : mobilStyles.input) : (surnameEmpty ? webStyles.inputEmpty : webStyles.input)} type="text" value={surname} onChange={e => setSurname(e.target.value)} onFocus={()=>setSurnameEmpty(false)} onBlur={()=>isEmpty(surname,setSurnameEmpty)}/>
                {surnameEmpty&&
                    <RequiredField/>
                }
                <p className="label">Contraseña</p>
                <input style={isMobileDevice ? (invalidPassword ? mobilStyles.inputEmpty : mobilStyles.input) : (invalidPassword ? webStyles.inputEmpty : webStyles.input)} type="password" value={password} onChange={e => setPassword(e.target.value)} onFocus={()=>setInvalidPassword(false)} onBlur={()=>setInvalidPassword(!isValidPassword(password))}/>
                {invalidPassword&&
                    <p className="invalidCredentials" style={isMobileDevice ? mobilStyles.invalidCredentials : webStyles.invalidCredentials}>La contraseña debe tener minimo 8 caracteres, 1 número, 1 mayúscula y 1 minúscula</p>
                }
                <input  
                    className = "button1"
                    type="button" 
                    onClick={registerSubmit} 
                    value="Registrarse" 
                    disabled={userInvalid||nameEmpty||surnameEmpty||invalidPassword}/>
                <div className="line"></div>
                <input 
                    className = "button2"
                    type="button" 
                    onClick={setLayoutLogin} 
                    value="Iniciar sesión" />
            </form>
          </div> 
    )
}

export default Register;