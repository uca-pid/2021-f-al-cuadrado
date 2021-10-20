import React from "react";
import MonthSummary from './Cards/MonthSummary';
import ExpensesHistory from './Cards/ExpensesHistory';
import CurrentBudget from './Cards/CurrentBudget';

import "./style.css";
 
const HomeContent = ({monthSummary, expenseHistory,searchExpenses,openPopUpCategoryDetails, openPopUpEditExpense, openPopUpDeleteExpense, update}) => {

    return(
        <div className="container">
            <CurrentBudget update ={update}/>
            <div style={{flex:1}}>
            <MonthSummary monthSummary={monthSummary} update ={update}/>
            <ExpensesHistory expenseHistory={expenseHistory} update ={update}/>
            </div>

            {/* <Categories openPopUpCategoryDetails={openPopUpCategoryDetails} update ={update}/> */}
        </div>
    )
}

export default HomeContent;