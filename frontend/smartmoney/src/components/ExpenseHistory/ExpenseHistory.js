import React from "react";
import "./style.css";
import {useState, useEffect} from 'react';
import BarChart from "./BarChart.js";



const ExpenseHistory = ({openPopUpCategories,update}) => {

useEffect(() => {},[update])
    return(
        <div className="cardContainer cardContainerExpenseHistory">
            <BarChart openPopUpCategories = {openPopUpCategories} update = {update}/>
        </div>
    )
}

export default ExpenseHistory;