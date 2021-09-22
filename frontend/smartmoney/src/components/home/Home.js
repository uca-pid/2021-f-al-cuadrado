import React from 'react';
import {useState, useEffect} from 'react';

import webStyles from "./webStyles";
import mobilStyles from "./mobilStyles";
import { useMediaQuery } from 'react-responsive';
import PopUpChangePassword from "./PopUpChangePassword";
import PopUpNewExpense from "./PopUpNewExpense";
import PopUpNewCategory from "./PopUpNewCategory";

import Header from './Header';
import Expenses from './Cards/Expenses';
import Categories from './Cards/Categories';
import "./style.css";
import HamburgerMenu from './HamburgerMenu';

const Home = () => {

  const isMobileDevice = useMediaQuery({
    query: "(max-device-width: 480px)",
  });

  const [popUpChangePassword, setPopUpChangePassword] = useState(false);
  const [popUpNewExpense, setPopUpNewpopUpNewExpense] = useState(false);
  const [popUpNewCategory, setPopUpNewpopUpNewCategory] = useState(false);
  const [hamburgerMenu, setHamburgerMenu] = useState(true);


  function closePopUpChangePassword(){
    setPopUpChangePassword(false)
  }
  function closePopUpNewExpense(){
    setPopUpNewpopUpNewExpense(false)
  }
  function closePopUpNewCategory(){
    setPopUpNewpopUpNewCategory(false)
  }
  function openPopUpChangePassword(){
    setPopUpChangePassword(true)
  }
  function openPopUpNewExpense(){
    setPopUpNewpopUpNewExpense(true)
  }
  function openPopUpNewCategory(){
    setPopUpNewpopUpNewCategory(true)
  }
  function hamburger (){
    setHamburgerMenu(!hamburgerMenu)
    console.log(hamburgerMenu)
}

  return (
    <div className="body bodyHome">

      {popUpChangePassword && <PopUpChangePassword closePopUp= {closePopUpChangePassword}/>}
      {popUpNewExpense && <PopUpNewExpense closePopUp= {closePopUpNewExpense}/>}
      {popUpNewCategory && <PopUpNewCategory closePopUp= {closePopUpNewCategory}/>}      

      
      <Header hamburger = {hamburger}/>

      <div style={isMobileDevice ? mobilStyles.main : webStyles.main}>
        {/* <Expenses /> */}
        <HamburgerMenu hamburger={hamburgerMenu} changePassword={openPopUpChangePassword} newExpense={openPopUpNewExpense} newCategory={openPopUpNewCategory}/>
        <div className="mainBody">
          <Categories/>
          <Expenses/>

        </div>
      </div>
      
    </div>
  );
}

export default Home;
