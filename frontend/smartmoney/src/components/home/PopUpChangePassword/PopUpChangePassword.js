import React from 'react';
import {useState} from 'react';
import "./style.css";
import webStyles from "../webStyles";
import mobilStyles from "../mobilStyles";
import { useMediaQuery } from 'react-responsive';
import RequiredField from '../../RequiredField/requiredField';
import isValidPassword from '../../../functions/passwordFormatValidation';

const PopUpChangePassword = ({closePopUp}) => {

    const isMobileDevice = useMediaQuery({
        query: "(max-device-width: 480px)",
    });

    const [previousPassword, setPreviousPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [previousPasswordEmpty, setPreviousPasswordEmpty] = useState(false);
    const [newPasswordInvalid, setNewPasswordInvalid] = useState(false);
    const [invalidCredentials, setInvalidCredentials] = useState('none');

    function updatePassword() {
        setInvalidCredentials('none')
        if(previousPassword==='')setPreviousPasswordEmpty(true);
        if(newPassword==='')setNewPasswordInvalid(true);
        if(!(previousPassword===''||newPassword==='')){
          const session = JSON.parse(localStorage.session);
          const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: session.code, old_password: previousPassword, new_password: newPassword})
          };
          fetch('https://smart-money-back.herokuapp.com/changePassword/'+session.user_id+'/', requestOptions)
            .then((response) => {
              if(response.status===200){
                closePopUp();
              }else{
                setInvalidCredentials('block')
              }
            })
        }
    }
    function isEmpty(input, isEmpty){
      if(input==='')isEmpty(true)
    }

    return(
        <div className="popUpComponent">
            <button className="popUpBackground" onClick={closePopUp}/>
            <div className="changePasswordContainer">
                <button className="close" onClick={closePopUp}>X</button>
                
                <div className="divCenteredItems">
                <p className="popUpTitle">Change password</p>
                <form className="formChangePassword">
                    
                    <p className="invalidCredentials" style={{display:invalidCredentials}}>Wrong credentials</p>
                    <p className="label" >Previous password</p>
                    <input style={isMobileDevice ? (previousPasswordEmpty ? mobilStyles.inputEmpty : mobilStyles.input) : (previousPasswordEmpty ? webStyles.inputEmpty : webStyles.input)} type="password" value={previousPassword} onChange={e => setPreviousPassword(e.target.value)}  onFocus={()=>setPreviousPasswordEmpty(false)} onBlur={()=>isEmpty(previousPassword,setPreviousPasswordEmpty)}/>
                    {previousPasswordEmpty&&<RequiredField/>}
                    <p className="label">New password</p>
                    <input style={isMobileDevice ? (newPasswordInvalid ? mobilStyles.inputEmpty : mobilStyles.input) : (newPasswordInvalid ? webStyles.inputEmpty : webStyles.input)} type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)}  onFocus={()=>setNewPasswordInvalid(false)} onBlur={()=>setNewPasswordInvalid(!isValidPassword(newPassword))}/>
                    {newPasswordInvalid&&<p className="invalidCredentials">Password must have al least 8 caracters, 1 number, 1 uppercase and 1 lowercase</p>}
                    <input 
                    className="button1"
                    type="button" 
                    onClick={updatePassword} 
                    value="Update" 
                    disabled={previousPasswordEmpty||newPasswordInvalid}/>
                </form>
                </div>
            </div>
        </div>
    )
}

export default PopUpChangePassword;