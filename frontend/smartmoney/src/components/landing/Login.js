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
import loginService from '../../services/loginService';



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
        loginService(user, password, setInvalidCredentials);
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
              inputProps={{ "data-testid": "user-input" }}
              label = "User" variant = 'outlined' 
              margin="dense"
              type="text" value={user} 
              onChange={e => setUser(e.target.value)} 
              onFocus={()=>setUserEmpty(false)} 
              onBlur={()=>isEmpty(user,setUserEmpty)}
              size = 'small'
              error = {userEmpty}
              helperText={userEmpty ? '* This field is required' : ' '}
              />

              <TextField
              inputProps={{ "data-testid": "password-input" }}
              margin="dense"
              label="Password" variant="outlined"
              type="password" value={password} onChange={e => setPassword(e.target.value)} 
              onFocus={()=>setPasswordEmpty(false)} 
              onBlur={()=>isEmpty(password,setPasswordEmpty)}
              size = 'small'
              error = {passwordEmpty}
              helperText={passwordEmpty ? '* This field is required' : ' '}
              />

              <Button 
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
                    data-testid="login-button"
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


