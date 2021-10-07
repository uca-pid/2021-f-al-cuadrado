import React from "react";
import "./style.css";
import {useState, useEffect} from 'react';
import BarChart from "./BarChart.js";



const ExpenseHistory = ({update}) => {

useEffect(() => {},[update])
    return(
        <div>
            <BarChart update = {update}/>
        </div>
    )
}

export default ExpenseHistory;