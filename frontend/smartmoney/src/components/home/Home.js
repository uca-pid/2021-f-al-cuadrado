import React from 'react';
import {useState, useEffect} from 'react';
import logoHorizontal from "./logoHorizontal.png"; 
import configurationIcon from "./configuration.png"; 
import webStyles from "./webStyles";
import mobilStyles from "./mobilStyles";
import { useMediaQuery } from 'react-responsive'
import FlatList from 'flatlist-react';
import RequiredField from '../RequiredField/requiredField';
import isValidPassword from '../../functions/passwordFormatValidation';


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
  const [previousPasswordEmpty, setPreviousPasswordEmpty] = useState(false);
  const [newPasswordInvalid, setNewPasswordInvalid] = useState(false);
  const [changePasswordInvalidCredentials, setChangePasswordInvalidCredentials] = useState(false);
  const [newExpenseOnlyNumbers, setNewExpenseOnlyNumbers] = useState(false);



  const [consumos, setConsumos] = useState([]);

  function setExpenses(){
    const session = JSON.parse(localStorage.session);
    let res = [];
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: session.code})
    };
    fetch('https://smart-money-back.herokuapp.com/expenses/'+session.user_id+'/', requestOptions)
      .then(response => response.json())
      .then(data => setConsumos(data));
  }

  useEffect(() => setExpenses())

  function configuration() {
    if(configutationMenu==='none'){
      setConfigutationMenu('block');
    }else{
      setConfigutationMenu('none');
    }
  }

  function logout() {
    setConfigutationMenu('none');
    localStorage.clear();
    window.location.href = "./"
  }
  function changePassword() {
    setConfigutationMenu('none');
    setPreviousPassword('');
    setNewPassword('');
    setPopUpChangePassword('block');
  }

  function agregarConsumo() {
    const onlyNumbers = /^[0-9]*$/;
    if(onlyNumbers.test(nuevoConsumo)){
      const session = JSON.parse(localStorage.session);
      const requestOptionsNewExpense = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: session.code, value: nuevoConsumo})
      };
      fetch('https://smart-money-back.herokuapp.com/new_expense/'+session.user_id+'/', requestOptionsNewExpense)
        .then((response) => {
          if(response.status===201){
            setNuevoConsumo('');
            const requestOptionsExpenses = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ code: session.code})
            };
            fetch('https://smart-money-back.herokuapp.com/expenses/'+session.user_id+'/', requestOptionsExpenses)
              .then(response => response.json())
              .then(data => setConsumos(data));
          }
        });
    }else{
      setNewExpenseOnlyNumbers(true)
    }   
  }
  function updatePassword() {
    setChangePasswordInvalidCredentials(false)
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
            setPopUpChangePassword('none');
          }else{
            setChangePasswordInvalidCredentials(true)
          }
        })
    }
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

  const renderConsumos = (item, index)=> {
    return (
      <tr style={isMobileDevice ? mobilStyles.expensesRow : webStyles.expensesRow}>
          <th style={isMobileDevice ? mobilStyles.expensesValue : webStyles.expensesValue}>$ {item.value}</th>       
      </tr>        
    )  
  }

  function isEmpty(input, isEmpty){
    if(input==='')isEmpty(true)
  }

  return (
    <div style={isMobileDevice ? mobilStyles.body : webStyles.body}>

      <button style={{position:'absolute', width:'100%', height:'100%', backgroundColor:'#333333', opacity:0.5, display:popUpChangePassword}} onClick={()=>setPopUpChangePassword('none')}/>
      <div style={{position:'absolute',alignSelf: 'center', top:'20%', width:250, height:300, backgroundColor:'#FFFFFF', display:popUpChangePassword, borderRadius:10}}>
        <button style={isMobileDevice ? mobilStyles.back : webStyles.back} onClick={()=>setPopUpChangePassword('none')}>X</button>
        <div style={isMobileDevice ? mobilStyles.divCenteredItems : webStyles.divCenteredItems}>
          <form style={isMobileDevice ? mobilStyles.formChangePassword : webStyles.formChangePassword}>
            <p style={changePasswordInvalidCredentials ? (isMobileDevice ? mobilStyles.invalidCredentials : webStyles.invalidCredentials):{display:'none'}}>Credenciales incorrectas</p>
            <p style={isMobileDevice ? mobilStyles.label : webStyles.label} >Contraseña anterior</p>
            <input style={isMobileDevice ? (previousPasswordEmpty ? mobilStyles.inputEmpty : mobilStyles.input) : (previousPasswordEmpty ? webStyles.inputEmpty : webStyles.input)} type="password" value={previousPassword} onChange={e => setPreviousPassword(e.target.value)}  onFocus={()=>setPreviousPasswordEmpty(false)} onBlur={()=>isEmpty(previousPassword,setPreviousPasswordEmpty)}/>
            {previousPasswordEmpty&&<RequiredField/>}
            <p style={isMobileDevice ? mobilStyles.label : webStyles.label}>Nueva contraseña</p>
            <input style={isMobileDevice ? (newPasswordInvalid ? mobilStyles.inputEmpty : mobilStyles.input) : (newPasswordInvalid ? webStyles.inputEmpty : webStyles.input)} type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)}  onFocus={()=>setNewPasswordInvalid(false)} onBlur={()=>isValidPassword(newPassword,setNewPasswordInvalid)}/>
            {newPasswordInvalid&&<p style={isMobileDevice ? mobilStyles.invalidCredentials : webStyles.invalidCredentials}>La contraseña debe tener minimo 8 caracteres, 1 número, 1 mayúscula y 1 minúscula</p>}
            <input 
              onMouseEnter={()=>{setButtomUpdatePassword(true);}} 
              onMouseLeave={()=>{setButtomUpdatePassword(false);}} 
              style={styleButtomUpdatePassword()}  
              type="button" 
              onClick={updatePassword} 
              value="Actualizar" 
              disabled={previousPasswordEmpty||newPasswordInvalid}/>
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
          <div>
            <input style={isMobileDevice ? mobilStyles.input : webStyles.input} type="text" value={nuevoConsumo} onChange={e => setNuevoConsumo(e.target.value)} onFocus={()=>setNewExpenseOnlyNumbers(false)}/>
            {newExpenseOnlyNumbers&&<p style={isMobileDevice ? mobilStyles.invalidCredentials : webStyles.invalidCredentials}>Sólo números</p>}
          </div>
          <input 
            onMouseEnter={()=>{setButtomAgregarConsumo(true);}} 
            onMouseLeave={()=>{setButtomAgregarConsumo(false);}} 
            style={styleButtonAgregarConsumo()} 
            type="button" 
            onClick={agregarConsumo} 
            value="Agregar consumo" 
            disabled={nuevoConsumo===''}/>
        </div>
        <div style={isMobileDevice ? mobilStyles.expensesContainer : webStyles.expensesContainer}>
          <table style={isMobileDevice ? mobilStyles.expensesTable : webStyles.expensesTable}>
          <FlatList 
            list={consumos}
            renderItem={renderConsumos}
            renderWhenEmpty={() => <div>Todavía no se regitró ningún gasto!</div>}
            sort={{by:"id"}}
          />
        </table>
          </div>
        
        
      </div>
      
    </div>
  );
}

export default Home;
