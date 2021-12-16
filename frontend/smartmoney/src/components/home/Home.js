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
import PopUpBudgetConfirmation from "./PopUpBudgetConfirmation";
import PopUpEditBudgets from "./PopUpEditBudgets";
import PopUpDeleteBudget from "./PopUpDeleteBudget";
import HomeContent from '../HomeContent';
import MonthSummary from '../MonthSummary';
import ExpenseHistory from '../ExpenseHistory';
import SearchExpenses from '../SearchExpenses';
import Header from './Header';

import "./style.css";
import HamburgerMenu from './HamburgerMenu';
import PopUpBudgetDetails from './PopUpBudgetDetails';
import PopUpCantCreateBudget from './PopUpCantCreateBudget';
import PopUpCantCreateCategory from './PopUpCantCreateCategory';
import PopUpSessionExpired from './PopUpSessionExpired';


const Home = () => {

  const isMobileDevice = useMediaQuery({
    query: "(max-device-width: 480px)",
  });

  const [screen, setScreen] = useState('homeContent');

  const [popUpChangePassword, setPopUpChangePassword] = useState(false);
  const [hamburgerMenu, setHamburgerMenu] = useState(true);
  const [updateComponent, setUpdateComponent] = useState(false);
  const [selectedMonth,setSelectedMonth] = useState('');
  const [popUpSessionExpired,setPopUpSessionExpired] = useState(false);

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
  const [popUpCantCreateCategory, setPopUpCantCreateCategory] = useState(false);

  
  //Budgets
  const [popUpNewBudget, setPopUpNewBudget] = useState(false);
  const [popUpNewBudgetState, setPopUpNewBudgetState] = useState('');
  const [popUpEditBudget, setPopUpEditBudget] = useState('');
  const [popUpEditBudgets,setPopUpEditBudgets] = useState(false);
  const [popUpDeleteBudget, setPopUpDeleteBudget] = useState('');
  const [popUpDeleteBudgetDisplay, setPopUpDeleteBudgetDisplay] = useState(false);
  const [popUpConfirmBudget, setPopUpConfirmBudget] = useState(false);
  const [popUpBudgetConfirmation, setPopUpBudgetConfirmation] = useState(false);
  const [popUpBudgetDetails, setPopUpBudgetDetails] = useState(false);
  const [popUpBudgetDetailsMonth, setPopUpBudgetDetailsMonth] = useState(false);
  const [popUpCantCreateBudget, setPopUpCantCreateBudget] = useState(false);

  function fetchCategories(){
    const session = JSON.parse(localStorage.session);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: session.code})
    };
    fetch('https://smart-money-back.herokuapp.com/categories/'+session.user_id+'/', requestOptions)
      .then(response => {
        if(response.status===200){
            return response.json()
        }else if (response.status===401){
          openPopUpSessionExpired()
        }
      })
      .then(data => {
        let allCategories = [];
        data.map( obj => {allCategories.push(obj.name)});
        localStorage.setItem('allCategories',allCategories);
    })
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
  }
  function updateComponents(){
    setUpdateComponent(!updateComponent)
  }
  function deletedCategory(){
    setSelectedCategory('');
    setPopUpCategoryDetails(false);
    fetchCategories();
    updateComponents();
  }
  function openPopUpSessionExpired(){
    setPopUpSessionExpired(true);
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
  function openPopUpCantCreateCategory(){
    setPopUpCantCreateCategory(true);
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
  function closePopUpCantCreateCategory(){
    setPopUpCantCreateCategory(false);
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
  function openPopUpEditBudget (budgetMonth){
    setPopUpNewBudgetState('Edit');
    setPopUpEditBudget(budgetMonth);
    setPopUpNewBudget(true);
  }
  function openPopUpDeleteBudget (budget){
    setPopUpDeleteBudget(budget);
    setPopUpDeleteBudgetDisplay(true);
  }
  function openPopUpConfirmBudgets (budget, total){
    setPopUpConfirmBudget(budget);
    setPopUpBudgetConfirmation(true);
  }
  function openPopUpBudgetDetails(month){
    setPopUpBudgetDetailsMonth(month);
    setPopUpBudgetDetails(true);
    updateComponents();
  }
  function openPopUpCantCreateBudget(){
    setPopUpCantCreateBudget(true);
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
  function closePopUpDeleteBudget(){
    setPopUpDeleteBudgetDisplay(false);
    updateComponents();
  }
  function closePopUpConfirmBudget(){
    setPopUpBudgetConfirmation(false);
    updateComponents();
  }
  function closePopUpBudgetDetails(){
    setPopUpBudgetDetails(false);
    updateComponents();
  }
  function closePopUpCantCreateBudget(){
    setPopUpCantCreateBudget(false);
  }


  return (
    <div className="body bodyHome">
      {popUpCategories && <PopUpCategory month={selectedMonth} closePopUp={closePopUpCategories} openPopUpCategoryDetails={openPopUpCategoryDetails} update ={updateComponent} openPopUpSessionExpired={openPopUpSessionExpired}/>}
      {popUpCategoryDetails && <PopUpCategoryDetails month={selectedMonth} category={selectedCategory} closePopUp={closePopUpCategoryDetails} openPopUpEditExpense={openPopUpEditExpense} editCategory={openPopUpEditCategory} deleteCategoryPopUp={openPopUpDeleteCategory} update ={updateComponent} openPopUpSessionExpired={openPopUpSessionExpired}/>}
      {popUpChangePassword && <PopUpChangePassword closePopUp= {closePopUpChangePassword} openPopUpSessionExpired={openPopUpSessionExpired}/>}
      {popUpNewExpense && <PopUpNewExpense closePopUp= {closePopUpNewExpense} state={popUpNewExpenseState} expenseToEdit={popUpEditExpense} openPopUpDeleteExpense={openPopUpDeleteExpense} openPopUpNewCategory={openPopUpNewCategory}  openPopUpSessionExpired={openPopUpSessionExpired}/>}
      {popUpEditCategories && <PopUpEditCategories closePopUp={closePopUpEditCategories} openPopUpEditCategory={openPopUpEditCategory} openPopUpDeleteCategory={openPopUpDeleteCategory} update ={updateComponent} openPopUpSessionExpired={openPopUpSessionExpired}/>}
      {popUpNewCategory && <PopUpNewCategory closePopUp= {closePopUpNewCategory} state={popUpNewCategoryState} categoryToEdit={popUpEditCategory} openPopUpCantCreateCategory={openPopUpCantCreateCategory} openPopUpSessionExpired={openPopUpSessionExpired}/>}
      {popUpDeleteExpenseDisplay && <PopUpDeleteExpense closePopUp= {closePopUpDeleteExpense} expenseToDelete={popUpDeleteExpense} openPopUpSessionExpired={openPopUpSessionExpired}/>}
      {popUpDeleteCategoryDisplay && <PopUpDeleteCategory closePopUp= {closePopUpDeleteCategory} categoryToDelete={popUpDeleteCategory} deleted={deletedCategory} openPopUpSessionExpired={openPopUpSessionExpired}/>}
      {popUpEditBudgets && <PopUpEditBudgets closePopUp= {closePopUpEditBudgets} openPopUpEditBudget={openPopUpEditBudget} openPopUpDeleteBudget={openPopUpDeleteBudget} update ={updateComponent} openPopUpSessionExpired={openPopUpSessionExpired}/>}
      {popUpNewBudget && <PopUpBudget closePopUp= {closePopUpNewBudget} state={popUpNewBudgetState} budgetToEdit={popUpEditBudget} openPopUpDeleteBudget={openPopUpDeleteBudget} confirmBudget={openPopUpConfirmBudgets} openPopUpCantCreateBudget={openPopUpCantCreateBudget} openPopUpSessionExpired={openPopUpSessionExpired}/>}
      {popUpDeleteBudgetDisplay && <PopUpDeleteBudget closePopUp= {closePopUpDeleteBudget} budgetToDelete={popUpDeleteBudget} openPopUpSessionExpired={openPopUpSessionExpired}/>}
      {popUpBudgetConfirmation && <PopUpBudgetConfirmation closePopUp= {closePopUpConfirmBudget} budget={popUpConfirmBudget} closeNewBudgetPopUp={closePopUpNewBudget} openPopUpSessionExpired={openPopUpSessionExpired}/>}
      {popUpBudgetDetails && <PopUpBudgetDetails closePopUp= {closePopUpBudgetDetails} month={popUpBudgetDetailsMonth} openPopUpSessionExpired={openPopUpSessionExpired}/>}
      {popUpCantCreateBudget && <PopUpCantCreateBudget closePopUp= {closePopUpCantCreateBudget} openPopUpSessionExpired={openPopUpSessionExpired}/>}
      {popUpCantCreateCategory && <PopUpCantCreateCategory closePopUp= {closePopUpCantCreateCategory} openPopUpSessionExpired={openPopUpSessionExpired}/>}
      {popUpSessionExpired && <PopUpSessionExpired/>}

      <Header hamburger = {hamburger}/>
      

      <div style={isMobileDevice ? mobilStyles.main : webStyles.main}>
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
          openPopUpSessionExpired={openPopUpSessionExpired}
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
              newBudget={openPopUpNewBudget}
              update ={updateComponent}
              openPopUpSessionExpired={openPopUpSessionExpired}/>
            ||
            (screen === "monthSummary")&&
              <MonthSummary 
              openPopUpCategoryDetails={openPopUpCategoryDetails} 
              update ={updateComponent}
              openPopUpSessionExpired={openPopUpSessionExpired}/>
            ||
            (screen === "expenseHistory")&&
              <ExpenseHistory 
              openPopUpCategories = {openPopUpCategories}
              openPopUpBudgetDetails = {openPopUpBudgetDetails}
              update ={updateComponent}
              openPopUpSessionExpired={openPopUpSessionExpired}
              />
            ||
            (screen === "searchExpenses")&&
              <SearchExpenses 
                openPopUpEditExpense={openPopUpEditExpense}  
                openPopUpDeleteExpense={openPopUpDeleteExpense} 
                update ={updateComponent}
                openPopUpSessionExpired={openPopUpSessionExpired}
                />
          }

        </div>
      </div>
      
    </div>
  );
}

export default Home;
