import React from 'react';
import {useState} from 'react';
import "./style.css";
import webStyles from "./webStyles";
import mobilStyles from "./mobilStyles";
import { useMediaQuery } from 'react-responsive';
import RequiredField from '../RequiredField/requiredField';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';



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
              <p className="invalidCredentials" style={{display:invalidCredentials}}>Wrong credentials</p>

              <TextField
              label = "User" variant = 'outlined' 
              margin="dense"
              //style={isMobileDevice ? (userEmpty ? mobilStyles.inputEmpty : mobilStyles.input) : (userEmpty ? webStyles.inputEmpty : webStyles.input)}
              type="text" value={user} 
              onChange={e => setUser(e.target.value)} 
              onFocus={()=>setUserEmpty(false)} 
              onBlur={()=>isEmpty(user,setUserEmpty)}
              size = 'small'
              error = {userEmpty}
              helperText={userEmpty ? '* This field is required' : ' '}
              />

              <TextField
              margin="dense"
              label="Password" variant="outlined"
              //style={isMobileDevice ? (passwordEmpty ? mobilStyles.inputEmpty : mobilStyles.input) : (passwordEmpty ? webStyles.inputEmpty : webStyles.input)} 
              type="password" value={password} onChange={e => setPassword(e.target.value)} 
              onFocus={()=>setPasswordEmpty(false)} 
              onBlur={()=>isEmpty(password,setPasswordEmpty)}
              size = 'small'
              error = {passwordEmpty}
              helperText={passwordEmpty ? '* This field is required' : ' '}
              />

              <Button 
              //style={isMobileDevice ? mobilStyles.forgotPassword : webStyles.forgotPassword} 
              type="button" onClick={setLayoutForgotPassword} 
              size = 'small'
              style={{justifyContent: 'left', fontSize: 10}}
              >
              Forgot password
              </Button>

              <Stack   
                    style={{minWidth: '70%'}}
                    direction="row" 
                    justifyContent="center" 
                    alignItems="center" 
                    spacing={2}>
                 <Button 
                    style={{minWidth: '50%'}}
                    variant = "contained"
                    onClick={login} 
                    disabled={userEmpty||passwordEmpty}>
                      Login
                  </Button>
                  <Button
                    style={{maxWidth: '700px'}}
                    variant="outlined"
                    onClick={setLayoutRegister} > 
                      Register
                  </Button>
                
              </Stack>
            </form>
          </div> 
    )
}

export default Login;