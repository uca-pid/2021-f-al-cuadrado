import React from 'react';
import {useState, useEffect} from 'react';

import webStyles from "./webStyles";
import mobilStyles from "./mobilStyles";
import { useMediaQuery } from 'react-responsive';
import PopUpChangePassword from "./PopUpChangePassword";
import PopUpNewExpense from "./PopUpNewExpense";
import PopUpDeleteExpense from "./PopUpDeleteExpense";
import PopUpNewCategory from "./PopUpNewCategory";
import PopUpCategoryDetails from "./PopUpCategoryDetails";
import PopUpDeleteCategory from "./PopUpDeleteCategory";
import PopUpCategory from "./PopUpCategory"
import HomeContent from '../HomeContent';
import MonthSummary from '../MonthSummary';
import ExpenseHistory from '../ExpenseHistory';
import SearchExpenses from '../SearchExpenses';
import Header from './Header';

import "./style.css";
import HamburgerMenu from './HamburgerMenu';

const Home = () => {

  const isMobileDevice = useMediaQuery({
    query: "(max-device-width: 480px)",
  });

  const [screen, setScreen] = useState('homeContent');

  const [popUpChangePassword, setPopUpChangePassword] = useState(false);
  const [popUpNewExpense, setPopUpNewExpense] = useState(false);
  const [popUpNewExpenseState, setPopUpNewExpenseState] = useState('');
  const [popUpEditExpense, setPopUpEditExpense] = useState('');
  const [popUpNewCategory, setPopUpNewCategory] = useState(false);
  const [popUpCategoryDetails, setPopUpCategoryDetails] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [hamburgerMenu, setHamburgerMenu] = useState(true);
  const [popUpDeleteExpense, setPopUpDeleteExpense] = useState('');
  const [popUpDeleteExpenseDisplay, setPopUpDeleteExpenseDisplay] = useState(false);
  const [popUpDeleteCategory, setPopUpDeleteCategory] = useState('');
  const [popUpDeleteCategoryDisplay, setPopUpDeleteCategoryDisplay] = useState(false);
  const [popUpNewCategoryState, setPopUpNewCategoryState] = useState('');
  const [popUpEditCategory, setPopUpEditCategory] = useState('');
  const [updateComponent, setUpdateComponent] = useState(false);
  const [popUpCategories,setPopUpCategories] = useState(false);
  const [selectedMonth,setSelectedMonth] = useState('')


  function closePopUpChangePassword(){
    setPopUpChangePassword(false);
  }
  function closePopUpNewExpense(){
    setPopUpNewExpense(false);
    updateComponents();
  }
  function closePopUpNewCategory(){
    setPopUpNewCategory(false);
    updateComponents();
  }
  function openPopUpChangePassword(){
    setPopUpChangePassword(true)
  }
  function openPopUpNewExpense(){
    setPopUpNewExpenseState('New');
    setPopUpEditExpense('');
    setPopUpNewExpense(true);
  }
  function openPopUpNewCategory(){
    setPopUpNewCategoryState('New');
    setPopUpEditCategory('');
    setPopUpNewCategory(true)
  }
  function hamburger (){
    setHamburgerMenu(!hamburgerMenu);
    console.log(hamburgerMenu);
}
function openPopUpCategoryDetails(category){
    setSelectedCategory(category);
    setPopUpCategoryDetails(true);
}
function closePopUpCategoryDetails(){
  setPopUpCategoryDetails(false);
}
function openPopUpCategories(month){
    setSelectedMonth(month);
    setPopUpCategories(true);
}

function closePopUpCategories(){
  setPopUpCategories(false);
}
const openPopUpEditExpense = (expense) =>{
  setPopUpNewExpenseState('Edit');
  setPopUpEditExpense(expense);
  setPopUpNewExpense(true);
}
const openPopUpEditCategory = (category) =>{
  setPopUpNewCategoryState('Edit');
  setPopUpEditCategory(category);
  setPopUpNewCategory(true);
}
const openPopUpDeleteExpense = (expense) =>{
  setPopUpDeleteExpense(expense);
  setPopUpDeleteExpenseDisplay(true);
}
function closePopUpDeleteExpense(){
  setPopUpDeleteExpenseDisplay(false);
  updateComponents();
}
const openPopUpDeleteCategory = (category) =>{
  setPopUpDeleteCategory(category);
  setPopUpDeleteCategoryDisplay(true);
}
function closePopUpDeleteCategory(){
  setPopUpDeleteCategoryDisplay(false);
}
function deletedCategory(){
  setSelectedCategory('');
  setPopUpCategoryDetails(false);
  updateComponents();
}

function updateComponents(){
  setUpdateComponent(!updateComponent)
}



  return (
    <div className="body bodyHome">
      {popUpCategories && <PopUpCategory month={selectedMonth} closePopUp={closePopUpCategories} openPopUpCategoryDetails={openPopUpCategoryDetails} update ={updateComponent}/>}
      {popUpCategoryDetails && <PopUpCategoryDetails category={selectedCategory} closePopUp={closePopUpCategoryDetails} openPopUpEditExpense={openPopUpEditExpense} editCategory={openPopUpEditCategory} deleteCategoryPopUp={openPopUpDeleteCategory} update ={updateComponent}/>}
      {popUpChangePassword && <PopUpChangePassword closePopUp= {closePopUpChangePassword}/>}
      {popUpNewExpense && <PopUpNewExpense closePopUp= {closePopUpNewExpense} state={popUpNewExpenseState} expenseToEdit={popUpEditExpense}/>}
      {popUpNewCategory && <PopUpNewCategory closePopUp= {closePopUpNewCategory} state={popUpNewCategoryState} categoryToEdit={popUpEditCategory}/>}
      {/* {popUpNewCategory && <PopUpNewCategory closePopUp= {closePopUpNewCategory}/>}       */}
      {popUpDeleteExpenseDisplay && <PopUpDeleteExpense closePopUp= {closePopUpDeleteExpense} expenseToDelete={popUpDeleteExpense}/>}
      {popUpDeleteCategoryDisplay && <PopUpDeleteCategory closePopUp= {closePopUpDeleteCategory} categoryToDelete={popUpDeleteCategory} deleted={deletedCategory}/>}




      
      <Header hamburger = {hamburger}/>
      

      <div style={isMobileDevice ? mobilStyles.main : webStyles.main}>
        {/* <Expenses /> */}
        <HamburgerMenu 
          hamburger={hamburgerMenu} 
          changePassword={openPopUpChangePassword} 
          newExpense={openPopUpNewExpense} 
          newCategory={openPopUpNewCategory}
          home={()=>setScreen('homeContent')}
          monthSummary={()=>setScreen('monthSummary')}
          expenseHistory={()=>setScreen('expenseHistory')}
          searchExpenses={()=>setScreen('searchExpenses')}
        />
        {isMobileDevice && <button className="backgroundCloseMenu" onClick={hamburger} style={hamburgerMenu?{display:'block'}:{display:'none'}}/>}
        <div className="mainBody">
          {(screen === "homeContent")&&
              <HomeContent 
              openPopUpCategoryDetails={openPopUpCategoryDetails} 
              openPopUpEditExpense={openPopUpEditExpense}  
              openPopUpDeleteExpense={openPopUpDeleteExpense} 
              update ={updateComponent}/>
            ||
            (screen === "monthSummary")&&
              <MonthSummary 
              openPopUpCategoryDetails={openPopUpCategoryDetails} 
              update ={updateComponent}/>
            ||
            (screen === "expenseHistory")&&
              <ExpenseHistory 
              openPopUpCategories = {openPopUpCategories}
              update ={updateComponent}
              />
            ||
            (screen === "searchExpenses")&&
              <SearchExpenses />
          }

        </div>
      </div>
      
    </div>
  );
}

export default Home;
