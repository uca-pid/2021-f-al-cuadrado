import React from "react";
import Expenses from './Cards/Expenses';
import Categories from './Cards/Categories';
import "./style.css";
 
const HomeContent = ({openPopUpCategoryDetails, openPopUpEditExpense, openPopUpDeleteExpense, update}) => {

    return(
        <div className="container">
            <Categories openPopUpCategoryDetails={openPopUpCategoryDetails} update ={update}/>
            <Expenses openPopUpEditExpense={openPopUpEditExpense}  openPopUpDeleteExpense={openPopUpDeleteExpense} update ={update}/>
        </div>
    )
}

export default HomeContent;