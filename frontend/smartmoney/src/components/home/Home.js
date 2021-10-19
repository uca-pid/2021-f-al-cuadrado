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
import PopUpCategory from "./PopUpCategory";
import PopUpEditCategories from "./PopUpEditCategories";
import PopUpBudget from "./PopUpBudget";
import PopUpEditBudgets from "./PopUpEditBudgets";
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
  const [hamburgerMenu, setHamburgerMenu] = useState(true);
  const [updateComponent, setUpdateComponent] = useState(false);
  const [selectedMonth,setSelectedMonth] = useState('');

  //Expenses
  const [popUpNewExpense, setPopUpNewExpense] = useState(false);
  const [popUpNewExpenseState, setPopUpNewExpenseState] = useState('');
  const [popUpEditExpense, setPopUpEditExpense] = useState('');
  const [popUpDeleteExpense, setPopUpDeleteExpense] = useState('');
  const [popUpDeleteExpenseDisplay, setPopUpDeleteExpenseDisplay] = useState(false);

  //Categories
  const [popUpNewCategory, setPopUpNewCategory] = useState(false);
  const [popUpCategoryDetails, setPopUpCategoryDetails] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [popUpDeleteCategory, setPopUpDeleteCategory] = useState('');
  const [popUpDeleteCategoryDisplay, setPopUpDeleteCategoryDisplay] = useState(false);
  const [popUpNewCategoryState, setPopUpNewCategoryState] = useState('');
  const [popUpEditCategory, setPopUpEditCategory] = useState('');
  const [popUpCategories,setPopUpCategories] = useState(false);
  const [popUpEditCategories,setPopUpEditCategories] = useState(false);
  
  //Budgets
  const [popUpNewBudget, setPopUpNewBudget] = useState(false);
  const [popUpNewBudgetState, setPopUpNewBudgetState] = useState('');
  const [popUpEditBudget, setPopUpEditBudget] = useState('');
  const [popUpEditBudgets,setPopUpEditBudgets] = useState(false);
  const [popUpDeleteBudget, setPopUpDeleteBudget] = useState('');
  const [popUpDeleteBudgetDisplay, setPopUpDeleteBudgetDisplay] = useState(false);


  function fetchCategories(){
    const session = JSON.parse(localStorage.session);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: session.code})
    };
    fetch('https://smart-money-back.herokuapp.com/categories/'+session.user_id+'/', requestOptions)
      .then(response => response.json())
      .then(data => {
        let allCategories = [];
        data.map( obj => {allCategories.push(obj.name)});
        localStorage.setItem('allCategories',allCategories);
    });
  }
  useEffect(() => fetchCategories(),[])

  function openPopUpChangePassword(){
    setPopUpChangePassword(true)
  }
  function closePopUpChangePassword(){
    setPopUpChangePassword(false);
  }
  function hamburger (){
    setHamburgerMenu(!hamburgerMenu);
    console.log(hamburgerMenu);
  }
  function updateComponents(){
    setUpdateComponent(!updateComponent)
  }
  function deletedCategory(){
    setSelectedCategory('');
    setPopUpCategoryDetails(false);
    updateComponents();
  }

  //Pop ups Expenses open ---------------------------------------------
  function openPopUpNewExpense(){
    setPopUpNewExpenseState('New');
    setPopUpEditExpense('');
    setPopUpNewExpense(true);
  }
  function openPopUpEditExpense (expense){
    setPopUpNewExpenseState('Edit');
    setPopUpEditExpense(expense);
    setPopUpNewExpense(true);
  }
  function openPopUpDeleteExpense (expense) {
    setPopUpDeleteExpense(expense);
    setPopUpDeleteExpenseDisplay(true);
  }

  //Pop ups Expenses close ---------------------------------------------
  function closePopUpNewExpense(){
    setPopUpNewExpense(false);
    updateComponents();
  }
  function closePopUpDeleteExpense(){
    setPopUpDeleteExpenseDisplay(false);
    updateComponents();
  }

  //Pop ups Categories open ---------------------------------------------
  function openPopUpNewCategory(){
    setPopUpNewCategoryState('New');
    setPopUpEditCategory('');
    setPopUpNewCategory(true)
  }
  function openPopUpCategoryDetails(category,month){
    setSelectedMonth(month);
    setSelectedCategory(category);
    setPopUpCategoryDetails(true);
  }
  function openPopUpCategories(month){
    setSelectedMonth(month);
    setPopUpCategories(true);
  }
  function openPopUpEditCategory (category) {
    setPopUpNewCategoryState('Edit');
    setPopUpEditCategory(category);
    setPopUpNewCategory(true);
  }
  function openPopUpDeleteCategory (category){
    setPopUpDeleteCategory(category);
    setPopUpDeleteCategoryDisplay(true);
  }
  function openPopUpEditCategories(){
    setPopUpEditCategories(true);
  }

  //Pop ups Categories close ---------------------------------------------
  function closePopUpNewCategory(){
    setPopUpNewCategory(false);
    updateComponents();
  }
  function closePopUpCategoryDetails(){
    setPopUpCategoryDetails(false);
  }
  function closePopUpCategories(){
    setPopUpCategories(false);
  }
  function closePopUpDeleteCategory(){
    setPopUpDeleteCategoryDisplay(false);
  }
  function closePopUpEditCategories(){
    setPopUpEditCategories(false);
  }

  //Pop ups Budgets open ---------------------------------------------
  function openPopUpNewBudget(){
    setPopUpNewBudgetState('New');
    setPopUpEditBudget('');
    setPopUpNewBudget(true)
  }
  function openPopUpEditBudgets(){
    setPopUpEditBudgets(true);
  }
  function openPopUpEditBudget (budget){
    setPopUpNewBudgetState('Edit');
    setPopUpEditBudget(budget);
    setPopUpNewBudget(true);
  }
  function openPopUpDeleteBudget (budget){
    setPopUpDeleteBudget(budget);
    setPopUpDeleteBudgetDisplay(true);
  }


  //Pop ups Budgets close ---------------------------------------------
  function closePopUpNewBudget(){
    setPopUpNewBudget(false);
    updateComponents();
  }
  function closePopUpEditBudgets(){
    setPopUpEditBudgets(false);
  }
  function closePopUpDeleteBudget(){
    setPopUpDeleteBudgetDisplay(false);
  }






  return (
    <div className="body bodyHome">
      {popUpCategories && <PopUpCategory month={selectedMonth} closePopUp={closePopUpCategories} openPopUpCategoryDetails={openPopUpCategoryDetails} update ={updateComponent}/>}
      {popUpCategoryDetails && <PopUpCategoryDetails month={selectedMonth} category={selectedCategory} closePopUp={closePopUpCategoryDetails} openPopUpEditExpense={openPopUpEditExpense} editCategory={openPopUpEditCategory} deleteCategoryPopUp={openPopUpDeleteCategory} update ={updateComponent}/>}
      {popUpChangePassword && <PopUpChangePassword closePopUp= {closePopUpChangePassword}/>}
      {popUpNewExpense && <PopUpNewExpense closePopUp= {closePopUpNewExpense} state={popUpNewExpenseState} expenseToEdit={popUpEditExpense} openPopUpDeleteExpense={openPopUpDeleteExpense} />}
      {popUpEditCategories && <PopUpEditCategories closePopUp={closePopUpEditCategories} openPopUpEditCategory={openPopUpEditCategory} openPopUpDeleteCategory={openPopUpDeleteCategory} update ={updateComponent}/>}
      {popUpNewCategory && <PopUpNewCategory closePopUp= {closePopUpNewCategory} state={popUpNewCategoryState} categoryToEdit={popUpEditCategory}/>}
      {popUpDeleteExpenseDisplay && <PopUpDeleteExpense closePopUp= {closePopUpDeleteExpense} expenseToDelete={popUpDeleteExpense}/>}
      {popUpDeleteCategoryDisplay && <PopUpDeleteCategory closePopUp= {closePopUpDeleteCategory} categoryToDelete={popUpDeleteCategory} deleted={deletedCategory}/>}
      {popUpNewBudget && <PopUpBudget closePopUp= {closePopUpNewBudget} state={popUpNewBudgetState} budgetToEdit={popUpEditBudget}/>}
      {popUpEditBudgets && <PopUpEditBudgets closePopUp= {closePopUpEditBudgets} openPopUpEditBudget={openPopUpEditBudget} openPopUpDeleteBudget={openPopUpDeleteBudget} update ={updateComponent}/>}


      <Header hamburger = {hamburger}/>
      

      <div style={isMobileDevice ? mobilStyles.main : webStyles.main}>
        {/* <Expenses /> */}
        <HamburgerMenu 
          
          hamburger={hamburgerMenu} 
          changePassword={openPopUpChangePassword} 
          newExpense={openPopUpNewExpense} 
          newCategory={openPopUpNewCategory}
          editCategories={openPopUpEditCategories}
          newBudget={openPopUpNewBudget}
          editBudgets={openPopUpEditBudgets}
          home={()=>setScreen('homeContent')}
          monthSummary={()=>setScreen('monthSummary')}
          expenseHistory={()=>setScreen('expenseHistory')}
          searchExpenses={()=>setScreen('searchExpenses')}
        />
        {isMobileDevice && <button className="backgroundCloseMenu" onClick={hamburger} style={hamburgerMenu?{display:'block'}:{display:'none'}}/>}
        <div className="mainBody">
          {(screen === "homeContent")&&
              <HomeContent 
              monthSummary={()=>setScreen('monthSummary')}
              expenseHistory={()=>setScreen('expenseHistory')}
              searchExpenses={()=>setScreen('searchExpenses')}
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
              <SearchExpenses 
                openPopUpEditExpense={openPopUpEditExpense}  
                openPopUpDeleteExpense={openPopUpDeleteExpense} 
                update ={updateComponent}/>
          }

        </div>
      </div>
      
    </div>
  );
}

export default Home;
