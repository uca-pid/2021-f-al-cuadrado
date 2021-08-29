import React from 'react';
import {useState} from 'react';
import './App.css';

function App() {
  const [layout, setLayout] = useState('login');

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [mail, setMail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [userForgotPassword, setUserForgotPassword] = useState('');

  function login() {
    setLayout('login')
  }
  function forgotPass() {
    setLayout('forgotPassword')
  }
  function register() {
    setLayout('register')
  }
  function registerSubmit() {
    console.log('#TODO: register')
  }
  function forgotPasswordSubmit() {
    console.log('#TODO: forgotPass')
  }
  function returnLogin() {
    setLayout('login')
  }

  return (
    <div className="App" style={{
        position:'fixed',
        padding:0,
        margin:0,
        top:0,
        left:0,
        width: '100%',
        height: '100%',
        display: "flex", 
        flexDirection: "row"}}>
      <div style={{width:'35%',  backgroundColor:"#D7D7D6"}}>
        <p style={{fontSize:30, fontWeight:'bold'}}>Smart Money</p>
        {(layout==='login')&&
          <div name="Login" class="menu">     
            <form style={{ display: "flex", 
        flexDirection: 'column'}}>
              <p>Usuario:</p>
              <input type="text" value={user} onChange={e => setUser(e.target.value)} />
              <p>Contraseña:</p>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
              <input type="button" onClick={login} value="Iniciar sesión" />
              <input type="button" onClick={forgotPass} value="Olvidé mi contraseña" />
              <input type="button" onClick={register} value="Registrarse" />
            </form>
          </div> 
        }
        {(layout==='register')&&
          <div name="Register" class="menu">     
            <form style={{ display: "flex", 
        flexDirection: 'column'}}>
              <p>Mail:</p>
              <input type="text" value={mail} onChange={e => setMail(e.target.value)} />
              <p>Nombre:</p>
              <input type="text" value={name} onChange={e => setName(e.target.value)} />
              <p>Apellido:</p>
              <input type="text" value={surname} onChange={e => setSurname(e.target.value)} />
              <p>Contraseña:</p>
              <input type="password" value={registerPassword} onChange={e => setRegisterPassword(e.target.value)} />
              <input type="button" onClick={registerSubmit} value="Registrarse" />
              <input type="button" onClick={returnLogin} value="Iniciar sesión" />
            </form>
          </div> 
        }
        {(layout==='forgotPassword')&&
          <div name="ForgotPassword" class="menu">     
            <form style={{ display: "flex", 
        flexDirection: 'column'}}>
              <p>Usuario:</p>
              <input type="text" value={userForgotPassword} onChange={e => setUserForgotPassword(e.target.value)} />
              <input type="button" onClick={forgotPasswordSubmit} value="Enviar mail" />
              <input type="button" onClick={returnLogin} value="Volver" />
            </form>
          </div> 
        }
      </div>
      <div style={{width: '65%',backgroundColor:'#292928'}}>
      </div>
    </div>
  );
}

export default App;
