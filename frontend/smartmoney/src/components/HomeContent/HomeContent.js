import React from "react";
import Expenses from './Cards/Expenses';
import MonthSummary from './Cards/MonthSummary';
import ExpensesHistory from './Cards/ExpensesHistory';
import CurrentBudget from './Cards/CurrentBudget';

import "./style.css";
 
const HomeContent = ({monthSummary, expenseHistory,searchExpenses,openPopUpCategoryDetails, openPopUpEditExpense, openPopUpDeleteExpense, newBudget, update}) => {

    return(
        <div style={{width:'100%', overflowY:'auto', height:'100%'}}>
            <CurrentBudget newBudget={newBudget} update ={update} />
            <div className="container" style={{width:'100%'}}>
            <MonthSummary monthSummary={monthSummary} update ={update}/>
            <ExpensesHistory expenseHistory={expenseHistory} update ={update}/>
            <Expenses searchExpenses={searchExpenses} openPopUpEditExpense={openPopUpEditExpense}  openPopUpDeleteExpense={openPopUpDeleteExpense} update ={update}/>
            </div>

            {/* <Categories openPopUpCategoryDetails={openPopUpCategoryDetails} update ={update}/> */}
        </div>
    )
}

export default HomeContent;