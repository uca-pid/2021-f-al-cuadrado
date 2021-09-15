import React from 'react';
import {useState} from 'react';
import "./style.css";
import webStyles from "./webStyles";
import mobilStyles from "./mobilStyles";
import { useMediaQuery } from 'react-responsive';
import RequiredField from '../RequiredField/requiredField';
import isValidPassword from '../../functions/passwordFormatValidation';

const ForgotPassword = ({setLayoutLogin}) => {

    const isMobileDevice = useMediaQuery({
        query: "(max-device-width: 480px)",
    });

    const [user, setUser] = useState('');
    const [userId, setUserId] = useState('');
    const [codigoSeguridad, setCodigoSeguridad] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [codigoEnviado, setCodigoEnviado] = useState(false);

    const [userEmpty, setUserEmpty] = useState(false);
    const [codeEmpty, setCodeEmpty] = useState(false);
    const [invalidUser, setInvalidUser] = useState(false);
    const [invalidCredentials, setInvalidCredentials] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);

    const isEmpty = (input, isEmpty) => {
        if(input==='')isEmpty(true)
      }

    const forgotPasswordSubmit = () =>{
        setInvalidUser(false)
        setInvalidCredentials(false)
        if(user===''){
          setUserEmpty(true);
        }else{
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user})
          };
          fetch('https://smart-money-back.herokuapp.com/forgotPassword/', requestOptions)
            .then((response) => response.json())
            .then(data => {
              setUserId(data.user_id);
              setCodigoEnviado(true);
            })
            .catch(err => setInvalidUser(true))
        }
    }
    const updatePasswordSubmit = () =>{
        setInvalidUser(false)
        setInvalidCredentials(false)
        if(codigoSeguridad==='')setCodeEmpty(true);
        if(newPassword==='')setInvalidPassword(true);
        if(!(codigoSeguridad===''||newPassword===''||invalidPassword)){
          const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ new_password: newPassword, code: codigoSeguridad})
          };
          fetch('https://smart-money-back.herokuapp.com/forgotPassword/'+userId+'/', requestOptions)
          .then((response) => {
            if(response.status===200){
              window.location.href = "./"
            }else{
              setInvalidCredentials(true)
            }
          })
        }
    }
    
    return(
        <div className="formContainer"  name="ForgotPassword">     
            <form className="form">
              <p className="invalidCredentials" style={invalidUser ? (isMobileDevice ? mobilStyles.invalidCredentials : webStyles.invalidCredentials):{display:'none'}}>El usuario ingresado no existe</p>
              <p className="invalidCredentials" style={invalidCredentials ? (isMobileDevice ? mobilStyles.invalidCredentials : webStyles.invalidCredentials):{display:'none'}}>Código incorrecto</p>
              <p className="label">Usuario</p>
              <input style={isMobileDevice ? (userEmpty ? mobilStyles.inputEmpty : mobilStyles.input) : (userEmpty ? webStyles.inputEmpty : webStyles.input)} type="text" value={user} onChange={e => setUser(e.target.value)} onFocus={()=>setUserEmpty(false)} onBlur={()=>isEmpty(user,setUserEmpty)}/>
              {userEmpty&&<RequiredField/>}
              {
                !codigoEnviado &&
                  <input 
                    className = "button1"
                    type="button" 
                    onClick={forgotPasswordSubmit} 
                    value="Enviar mail" 
                    disabled={userEmpty}/>
              }
              {codigoEnviado &&
                <div className="formCode">
                    <p className="label">Código</p>
                    <input style={isMobileDevice ? (codeEmpty ? mobilStyles.inputEmpty : mobilStyles.input) : (codeEmpty ? webStyles.inputEmpty : webStyles.input)} type="text" value={codigoSeguridad} onChange={e => setCodigoSeguridad(e.target.value)} onFocus={()=>setCodeEmpty(false)} onBlur={()=>isEmpty(codigoSeguridad,setCodeEmpty)}/>              
                    
                    {(codigoEnviado&&codeEmpty)&&<RequiredField/>}
            
                    <p className="label">Nueva contraseña</p>
                    <input style={isMobileDevice ? (invalidPassword ? mobilStyles.inputEmpty : mobilStyles.input) : (invalidPassword ? webStyles.inputEmpty : webStyles.input)} type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} onFocus={()=>setInvalidPassword(false)} onBlur={()=>isValidPassword(newPassword, setInvalidPassword)}/>

                    {invalidPassword&&<p className="invalidCredentials" style={isMobileDevice ? mobilStyles.invalidCredentials : webStyles.invalidCredentials}>La contraseña debe tener minimo 8 caracteres, 1 número, 1 mayúscula y 1 minúscula</p>}

                    <input 
                      className = "button1"
                      type="button" 
                      onClick={updatePasswordSubmit} 
                      value="Actualizar contraseña" 
                      disabled={userEmpty||codeEmpty||invalidPassword}/>
                    <div style={{height:10}}></div>
                    <input 
                      className = "button2" 
                      type="button" 
                      onClick={forgotPasswordSubmit} 
                      value="Reenviar código"
                      disabled={userEmpty}/>
                </div>
                  
              }
              <div className="line"></div>
              <input 
                className = "button2"
                type="button" 
                onClick={setLayoutLogin} 
                value="Volver" />
            </form>
          </div> 
    )
}

export default ForgotPassword;