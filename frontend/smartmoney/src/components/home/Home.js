import React from 'react';
import {useState} from 'react';
import logoHorizontal from "./logoHorizontal.png"; 
import configurationIcon from "./configuration.png"; 

const Home = () => {

  const [buttomLogoutHover, setButtomLogoutHover] = useState(false);
  const [configutationMenu, setConfigutationMenu] = useState('none');
  const [buttomAgregarConsumo, setButtomAgregarConsumo] = useState(false);
  const [buttomChangePassword, setButtomChangePassword] = useState(false);
  const [popUpChangePassword, setPopUpChangePassword] = useState('none');
  const [nuevoConsumo, setNuevoConsumo] = useState('');
  const [previousPassword, setPreviousPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [buttomUpdatePassword, setButtomUpdatePassword] = useState(false);




  function configuration() {
    if(configutationMenu==='none'){
      setConfigutationMenu('block');
    }else{
      setConfigutationMenu('none');
    }

  }

  function logout() {
    setConfigutationMenu('none');
    window.location.href = "./"
  }
  function changePassword() {
    setConfigutationMenu('none');
    setPreviousPassword('');
    setNewPassword('');
    setPopUpChangePassword('block');
  }

  function agregarConsumo() {
    //#TODO: enviar al back
  }
  function updatePassword() {
    setPopUpChangePassword('none');
    //#TODO: enviar al back
  }

  function styleButtonLogout(){
    if(buttomLogoutHover){
        return styles.buttomMenuHover;
    }else{
        return styles.buttomMenu;
    }
  }
  function styleChangePassword(){
    if(buttomChangePassword){
        return styles.buttomMenuHover;
    }else{
        return styles.buttomMenu;
    }
  }
  function styleButtonAgregarConsumo(){
    if(buttomAgregarConsumo){
        return styles.buttomAgregarConsumoHover;
    }else{
        return styles.buttomAgregarConsumo;
    }
  }
  function styleButtomUpdatePassword(){
    if(buttomUpdatePassword){
        return styles.buttomUpdatePasswordHover;
    }else{
        return styles.buttomUpdatePassword;
    }
  }

  return (
    <div style={{
        position:'fixed',
        padding:0,
        margin:0,
        top:0,
        left:0,
        width: '100%',
        height: '100%',
        display: "flex", 
        flexDirection: "column"}}>

      <button style={{position:'absolute', width:'100%', height:'100%', backgroundColor:'#333333', opacity:0.5, display:popUpChangePassword}} onClick={()=>setPopUpChangePassword('none')}/>
      <div style={{position:'absolute',alignSelf: 'center', top:'15%', width:250, height:250, backgroundColor:'#FFFFFF', display:popUpChangePassword, borderRadius:10}}>
        <button style={{position:'relative', left:220, top:5, backgroundColor:'#FFFFFF', border:0}} onClick={()=>setPopUpChangePassword('none')}>X</button>
        <div style={{display:'flex', flexDirection:'column',alignItems:'center', width:'100%'}}>
          <form style={{ display: "flex", flexDirection: 'column', width:'85%'}}>
            <p style={styles.label} >Contraseña anterior</p>
            <input style={styles.input} type="text" value={previousPassword} onChange={e => setPreviousPassword(e.target.value)} />
            <p style={styles.label}>Nueva contraseña</p>
            <input style={styles.input} type="text" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            <input 
              onMouseEnter={()=>{setButtomUpdatePassword(true);}} 
              onMouseLeave={()=>{setButtomUpdatePassword(false);}} 
              style={styleButtomUpdatePassword()}  
              type="button" 
              onClick={updatePassword} 
              value="Actualizar" />
          </form>
          </div>
      </div>
      
      <div style={{height: '10%',backgroundColor:'#292928',display:'flex' ,justifyContent:'space-between',alignItems:'center',flexDirection: "row"}}>
        <img src={logoHorizontal} style={{width:250, height:75, marginTop:10}}/>
        <div>
          <button 
            
            style={{height:25, width:25, marginRight:20, backgroundColor:'#292928', border:0}}
            type="button" 
            onClick={configuration} 
            >
               <img src={configurationIcon} style={{width:25, height:25}}/>
            </button>
        </div>
      </div>
      <div  style={{width:150, borderRadius:10,backgroundColor:"#FFFFFF", position:'absolute', right:15, top:60, display:configutationMenu}}>
        <button 
          onMouseEnter={()=>{setButtomChangePassword(true);}} 
          onMouseLeave={()=>{setButtomChangePassword(false);}} 
          style={styleChangePassword()}  
          type="button" 
          onClick={changePassword} 
          >Cambiar contraseña</button>
        <button 
          onMouseEnter={()=>{setButtomLogoutHover(true);}} 
          onMouseLeave={()=>{setButtomLogoutHover(false);}} 
          style={styleButtonLogout()}  
          type="button" 
          onClick={logout} 
          >Cerar sesión</button>
      </div>
      <div style={{backgroundColor:"#D7D7D6", display:'flex',flexDirection:'column', height:'90%'}}>
        <div style={{display:'flex',flexDirection:'row', alignItems:'center', margin:20}}>
          <input style={styles.input} type="text" value={nuevoConsumo} onChange={e => setNuevoConsumo(e.target.value)} />
          <input 
            onMouseEnter={()=>{setButtomAgregarConsumo(true);}} 
            onMouseLeave={()=>{setButtomAgregarConsumo(false);}} 
            style={styleButtonAgregarConsumo()} 
            type="button" 
            onClick={agregarConsumo} 
            value="Agregar consumo" />
        </div>
        
      </div>
      
    </div>
  );
}


const styles = {
  input: {
    backgroundColor: "#D7D7D6",
    borderRadius: 5,
    padding: 3,
  },
  label:{
    marginBottom:5,
    fontWeight:'bold'
  },
  // buttom1:{
  //   position: 'absolute',
  //   bottom:0,
  //   width:'100%',
  //   marginTop:0, 
  //   borderRadius:5, 
  //   backgroundColor:'#3399FF',
  //   border:0,
  //   color:'#FFFFFF',
  //   fontWeight:'bold',
  //   height:40,
  // },
  // buttom1Hover:{
  //   position: 'absolute',
  //   bottom:0,
  //   width:'100%',
  //   marginTop:20, 
  //   borderRadius:5, 
  //   border:0,
  //   color:'#FFFFFF',
  //   fontWeight:'bold',
  //   height:40,
  //   backgroundColor:'#005CB8',
  // },
  buttomMenu:{
    width:'100%',
    borderRadius:5, 
    height:27,
    backgroundColor:'#FFFFFF',
    border:0,
    color:'#222222',
    fontWeight:'bold',
    height:40,
  },
  buttomMenuHover:{
    width:'100%',
    
    borderRadius:5, 
    height:27,
    border:0,
    color:'#222222',
    fontWeight:'bold',
    height:40,
    backgroundColor:'#AAAAAA',
  },
  buttomAgregarConsumo:{
    marginLeft:20,
    width:200,
    borderRadius:5, 
    height:27,
    backgroundColor:'#3399FF',
    border:0,
    color:'#FFFFFF',
    fontWeight:'bold',
  },
  buttomAgregarConsumoHover:{
    marginLeft:20,
    width:200,
    borderRadius:5, 
    height:27,
    border:0,
    color:'#FFFFFF',
    fontWeight:'bold',
    backgroundColor:'#005CB8',
  },
  buttomUpdatePassword:{
    marginTop:40,
    width:'100%',
    borderRadius:5, 
    height:27,
    backgroundColor:'#3399FF',
    border:0,
    color:'#FFFFFF',
    fontWeight:'bold',
  },
  buttomUpdatePasswordHover:{
    marginTop:40,
    width:'100%',
    borderRadius:5, 
    height:27,
    border:0,
    color:'#FFFFFF',
    fontWeight:'bold',
    backgroundColor:'#005CB8',
  },
}

export default Home;
