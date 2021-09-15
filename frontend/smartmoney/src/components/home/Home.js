import React from 'react';
import {useState, useEffect} from 'react';
import logoHorizontal from "../../images/logoHorizontal.png"; 
import configurationIcon from "../../images/configuration.png"; 
import webStyles from "./webStyles";
import mobilStyles from "./mobilStyles";
import { useMediaQuery } from 'react-responsive'
import FlatList from 'flatlist-react';
import PopUpChangePassword from './PopUpChangePassword';


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

  const renderConsumos = (item, index)=> {
    return (
      <tr style={isMobileDevice ? mobilStyles.expensesRow : webStyles.expensesRow}>
          <th style={isMobileDevice ? mobilStyles.expensesValue : webStyles.expensesValue}>$ {item.value}</th>       
      </tr>        
    )  
  }


  function closePopUpChangePassword(){
    setPopUpChangePassword('none')
  }

  return (
    <div style={isMobileDevice ? mobilStyles.body : webStyles.body}>

      <PopUpChangePassword display={popUpChangePassword} closePopUp= {closePopUpChangePassword}/>
      
      
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
