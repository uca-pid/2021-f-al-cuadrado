import React from "react";
import "./style.css";
import {useState, useEffect} from 'react';
import BarChart from "./BarChart.js";



const ExpenseHistory = ({openPopUpCategories,openPopUpBudgetDetails,update,openPopUpSessionExpired}) => {

useEffect(() => {},[update])
    return(
        <div className="cardContainer cardContainerExpenseHistory">
            <BarChart openPopUpCategories = {openPopUpCategories} openPopUpBudgetDetails={openPopUpBudgetDetails} update = {update} openPopUpSessionExpired={openPopUpSessionExpired}/>
        </div>
    )
}

export default ExpenseHistory;