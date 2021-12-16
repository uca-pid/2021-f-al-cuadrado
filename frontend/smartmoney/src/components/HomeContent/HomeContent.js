import React from "react";
import Expenses from './Cards/Expenses';
import MonthSummary from './Cards/MonthSummary';
import ExpensesHistory from './Cards/ExpensesHistory';
import CurrentBudget from './Cards/CurrentBudget';

import "./style.css";
 
const HomeContent = ({monthSummary, expenseHistory,searchExpenses,openPopUpCategoryDetails, openPopUpEditExpense, openPopUpDeleteExpense, newBudget, update,openPopUpSessionExpired}) => {

    return(
        <div style={{width:'100%', overflowY:'auto', height:'100%'}}>
            <CurrentBudget newBudget={newBudget} update ={update}  openPopUpSessionExpired={openPopUpSessionExpired}/>
            <div className="container" style={{width:'100%'}}>
            <MonthSummary monthSummary={monthSummary} update ={update} openPopUpSessionExpired={openPopUpSessionExpired}/>
            <ExpensesHistory expenseHistory={expenseHistory} update ={update} openPopUpSessionExpired={openPopUpSessionExpired}/>
            <Expenses searchExpenses={searchExpenses} openPopUpEditExpense={openPopUpEditExpense}  openPopUpDeleteExpense={openPopUpDeleteExpense} update ={update} openPopUpSessionExpired={openPopUpSessionExpired}/>
            </div>
        </div>
    )
}

export default HomeContent;