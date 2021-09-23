import React from 'react';
import {useState, useEffect} from 'react';

import webStyles from "./webStyles";
import mobilStyles from "./mobilStyles";
import { useMediaQuery } from 'react-responsive';
import PopUpChangePassword from "./PopUpChangePassword";
import PopUpNewExpense from "./PopUpNewExpense";
import PopUpNewCategory from "./PopUpNewCategory";
import PopUpCategoryDetails from "./PopUpCategoryDetails";

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
  const [popUpNewExpense, setPopUpNewExpense] = useState(false);
  const [popUpNewExpenseState, setPopUpNewExpenseState] = useState('');
  const [popUpEditExpense, setPopUpEditExpense] = useState('');
  const [popUpNewCategory, setPopUpNewCategory] = useState(false);
  const [popUpCategoryDetails, setPopUpCategoryDetails] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [hamburgerMenu, setHamburgerMenu] = useState(true);


  function closePopUpChangePassword(){
    setPopUpChangePassword(false)
  }
  function closePopUpNewExpense(){
    setPopUpNewExpense(false)
  }
  function closePopUpNewCategory(){
    setPopUpNewCategory(false)
  }
  function openPopUpChangePassword(){
    setPopUpChangePassword(true)
  }
  function openPopUpNewExpense(){
    setPopUpNewExpenseState('New');
    setPopUpEditExpense('');
    setPopUpNewExpense(true)
  }
  function openPopUpNewCategory(){
    setPopUpNewCategory(true)
  }
  function hamburger (){
    setHamburgerMenu(!hamburgerMenu)
    console.log(hamburgerMenu)
}
function openPopUpCategoryDetails(categoryName){
    setSelectedCategory(categoryName);
    setPopUpCategoryDetails(true);
}
function closePopUpCategoryDetails(){
  setPopUpCategoryDetails(false)
}
const openPopUpEditExpense = (expense) =>{
  setPopUpNewExpenseState('Edit');
  setPopUpEditExpense(expense);
  setPopUpNewExpense(true);
  console.log(expense)
}



  return (
    <div className="body bodyHome">
      {popUpCategoryDetails && <PopUpCategoryDetails categoryName={selectedCategory} closePopUp={closePopUpCategoryDetails} openPopUpEditExpense={openPopUpEditExpense}/>}

      {popUpChangePassword && <PopUpChangePassword closePopUp= {closePopUpChangePassword}/>}
      {popUpNewExpense && <PopUpNewExpense closePopUp= {closePopUpNewExpense} state={popUpNewExpenseState} expenseToEdit={popUpEditExpense}/>}
      {popUpNewCategory && <PopUpNewCategory closePopUp= {closePopUpNewCategory}/>}      

      
      <Header hamburger = {hamburger}/>

      <div style={isMobileDevice ? mobilStyles.main : webStyles.main}>
        {/* <Expenses /> */}
        <HamburgerMenu hamburger={hamburgerMenu} changePassword={openPopUpChangePassword} newExpense={openPopUpNewExpense} newCategory={openPopUpNewCategory}/>
        <div className="mainBody">
          <Categories openPopUpCategoryDetails={openPopUpCategoryDetails}/>
          <Expenses openPopUpEditExpense={openPopUpEditExpense}/>

        </div>
      </div>
      
    </div>
  );
}

export default Home;
