import React from 'react';
import {useState} from 'react';
import logoHorizontal from "./logoHorizontal.png"; 
import configurationIcon from "./configuration.png"; 
import webStyles from "./webStyles";
import mobilStyles from "./mobilStyles";
import { useMediaQuery } from 'react-responsive'

const Home = () => {

  const isMobileDevice = useMediaQuery({
    query: "(max-device-width: 480px)",
  });

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
        return isMobileDevice ? mobilStyles.buttomMenuHover : webStyles.buttomMenuHover;
    }else{
        return isMobileDevice ? mobilStyles.buttomMenu : webStyles.buttomMenu;
    }
  }
  function styleChangePassword(){
    if(buttomChangePassword){
        return isMobileDevice ? mobilStyles.buttomMenuHover : webStyles.buttomMenuHover;
    }else{
        return isMobileDevice ? mobilStyles.buttomMenu : webStyles.buttomMenu;
    }
  }
  function styleButtonAgregarConsumo(){
    if(buttomAgregarConsumo){
        return isMobileDevice ? mobilStyles.buttomAgregarConsumoHover : webStyles.buttomAgregarConsumoHover;
    }else{
        return isMobileDevice ? mobilStyles.buttomAgregarConsumo : webStyles.buttomAgregarConsumo;
    }
  }
  function styleButtomUpdatePassword(){
    if(buttomUpdatePassword){
        return isMobileDevice ? mobilStyles.buttomUpdatePasswordHover : webStyles.buttomUpdatePasswordHover;
    }else{
        return isMobileDevice ? mobilStyles.buttomUpdatePassword : webStyles.buttomUpdatePassword;
    }
  }

  return (
    <div style={isMobileDevice ? mobilStyles.body : webStyles.body}>

      <button style={{position:'absolute', width:'100%', height:'100%', backgroundColor:'#333333', opacity:0.5, display:popUpChangePassword}} onClick={()=>setPopUpChangePassword('none')}/>
      <div style={{position:'absolute',alignSelf: 'center', top:'20%', width:250, height:250, backgroundColor:'#FFFFFF', display:popUpChangePassword, borderRadius:10}}>
        <button style={isMobileDevice ? mobilStyles.back : webStyles.back} onClick={()=>setPopUpChangePassword('none')}>X</button>
        <div style={isMobileDevice ? mobilStyles.divCenteredItems : webStyles.divCenteredItems}>
          <form style={isMobileDevice ? mobilStyles.formChangePassword : webStyles.formChangePassword}>
            <p style={isMobileDevice ? mobilStyles.label : webStyles.label} >Contraseña anterior</p>
            <input style={isMobileDevice ? mobilStyles.input : webStyles.input} type="text" value={previousPassword} onChange={e => setPreviousPassword(e.target.value)} />
            <p style={isMobileDevice ? mobilStyles.label : webStyles.label}>Nueva contraseña</p>
            <input style={isMobileDevice ? mobilStyles.input : webStyles.input} type="text" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
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
      
      <div style={isMobileDevice ? mobilStyles.menuContainer : webStyles.menuContainer}>
        <img src={logoHorizontal} style={isMobileDevice ? mobilStyles.logoHorizontal : webStyles.logoHorizontal}/>
        <div>
          <button 
            
            style={isMobileDevice ? mobilStyles.configurationButton : webStyles.configurationButton}
            type="button" 
            onClick={configuration} 
            >
               <img src={configurationIcon} style={isMobileDevice ? mobilStyles.configurationLogo : webStyles.configurationLogo}/>
            </button>
        </div>
      </div>
      <div style={{display:configutationMenu}}>
        <div  style={isMobileDevice ? mobilStyles.configurationMenu : webStyles.configurationMenu}>
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
      </div>
      
      <div style={isMobileDevice ? mobilStyles.main : webStyles.main}>
        <div style={isMobileDevice ? mobilStyles.agregarConsumoContainer : webStyles.agregarConsumoContainer}>
          <input style={isMobileDevice ? mobilStyles.input : webStyles.input} type="text" value={nuevoConsumo} onChange={e => setNuevoConsumo(e.target.value)} />
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

export default Home;
