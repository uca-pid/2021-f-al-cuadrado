import React from 'react';
import {useState} from 'react';
import './App.css';
import logo from "./logo.png"; 

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
        {(layout==='login')&&
          <div style={{display:'flex', height:'100%' ,justifyContent:'center',alignItems:'center'}} name="Login" class="menu">     
            <form style={{ display: "flex", flexDirection: 'column', width:'65%'}}>
              <p style={styles.label}>Usuario:</p>
              <input style={styles.input} type="text" value={user} onChange={e => setUser(e.target.value)} />
              <p style={styles.label}>Contraseña:</p>
              <input style={styles.input} type="password" value={password} onChange={e => setPassword(e.target.value)} />
              <input style={{backgroundColor:"#D7D7D6",borderStyle:'none', color:'blue', textDecorationLine: 'underline', textAlign:'left', fontSize:11}} type="button" onClick={forgotPass} value="Olvidé mi contraseña" />
              <input style={styles.button1} type="button" onClick={login} value="Iniciar sesión" />
              <div style={{marginTop: 40,marginBottom:40,backgroundColor:'#292928', height:3, borderRadius:10, width:'120%', position:'relative', left:'-10%'}}></div>
              <input style={styles.button2} type="button" onClick={register} value="Registrarse" />
            </form>
          </div> 
        }
        {(layout==='register')&&
          <div style={{display:'flex', height:'100%' ,justifyContent:'center',alignItems:'center'}} name="Register" class="menu">     
            <form style={{ display: "flex", flexDirection: 'column', width:'65%'}}>
              <p style={styles.label} >Mail:</p>
              <input style={styles.input} type="text" value={mail} onChange={e => setMail(e.target.value)} />
              <p style={styles.label}>Nombre:</p>
              <input style={styles.input} type="text" value={name} onChange={e => setName(e.target.value)} />
              <p style={styles.label}>Apellido:</p>
              <input style={styles.input} type="text" value={surname} onChange={e => setSurname(e.target.value)} />
              <p style={styles.label}>Contraseña:</p>
              <input style={styles.input} type="password" value={registerPassword} onChange={e => setRegisterPassword(e.target.value)} />
              <input style={styles.button1} type="button" onClick={registerSubmit} value="Registrarse" />
              <div style={{marginTop: 20,marginBottom:20,backgroundColor:'#292928', height:3, borderRadius:10, width:'120%', position:'relative', left:'-10%'}}></div>
              <input style={styles.button2} type="button" onClick={returnLogin} value="Iniciar sesión" />
            </form>
          </div> 
        }
        {(layout==='forgotPassword')&&
          <div style={{display:'flex', height:'100%' ,justifyContent:'center',alignItems:'center'}} name="ForgotPassword" class="menu">     
            <form style={{ display: "flex", flexDirection: 'column', width:'65%'}}>
              <p style={styles.label}>Usuario:</p>
              <input style={styles.input} type="text" value={userForgotPassword} onChange={e => setUserForgotPassword(e.target.value)} />
              <input style={styles.button1} type="button" onClick={forgotPasswordSubmit} value="Enviar mail" />
              <div style={{marginTop: 40,marginBottom:40,backgroundColor:'#292928', height:3, borderRadius:10, width:'120%', position:'relative', left:'-10%'}}></div>
              <input style={styles.button2} type="button" onClick={returnLogin} value="Volver" />
            </form>
          </div> 
        }
      </div>
      <div style={{width: '65%',backgroundColor:'#292928',display:'flex', height:'100%' ,justifyContent:'center',alignItems:'center'}}>
        <img src={logo} width="280" height="200" />
      </div>
    </div>
  );
}

const styles = {
  input: {
    backgroundColor: "#D7D7D6",
    borderRadius: 5,
    padding: 2,
  },
  label:{
    marginBottom:5,
  },
  button1:{
    marginTop:20, 
    borderRadius:5, 
    height:27
  },
  button2:{
    borderRadius:5, 
    height:27
  }
}

export default App;
