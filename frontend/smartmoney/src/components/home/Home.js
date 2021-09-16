import React from 'react';
import {useState, useEffect} from 'react';

import webStyles from "./webStyles";
import mobilStyles from "./mobilStyles";
import { useMediaQuery } from 'react-responsive'
import PopUpChangePassword from "./PopUpChangePassword"
import Menu from './Menu';
import Header from './Header';
import Expenses from './Expenses';
import "./style.css"

const Home = () => {

  const isMobileDevice = useMediaQuery({
    query: "(max-device-width: 480px)",
  });

  const [configutationMenu, setConfigutationMenu] = useState(false);
  const [popUpChangePassword, setPopUpChangePassword] = useState(false);

  function configuration() {
    setConfigutationMenu(!configutationMenu)
  }
  function closePopUpChangePassword(){
    setPopUpChangePassword(false)
  }
  function openPopUpChangePassword(){
    setConfigutationMenu(false);
    setPopUpChangePassword(true)
  }

  return (
    <div className="body bodyHome">

      {configutationMenu && <Menu openPopUpChangePassword={openPopUpChangePassword}/>} 
      {popUpChangePassword && <PopUpChangePassword closePopUp= {closePopUpChangePassword}/>}      
      
      <Header configurationMenu = {configuration}/>

      <div style={isMobileDevice ? mobilStyles.main : webStyles.main}>
        <Expenses />
      </div>
      
    </div>
  );
}

export default Home;
