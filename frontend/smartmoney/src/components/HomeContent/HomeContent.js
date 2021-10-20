import React from "react";
import MonthSummary from './Cards/MonthSummary';
import ExpensesHistory from './Cards/ExpensesHistory';
import "./style.css";
 
const HomeContent = ({monthSummary, expenseHistory,searchExpenses,openPopUpCategoryDetails, openPopUpEditExpense, openPopUpDeleteExpense, update}) => {

    return(
        <div className="container">
            <MonthSummary monthSummary={monthSummary} update ={update}/>
            <ExpensesHistory expenseHistory={expenseHistory} update ={update}/>
            {/* <Categories openPopUpCategoryDetails={openPopUpCategoryDetails} update ={update}/> */}
        </div>
    )
}

export default HomeContent;