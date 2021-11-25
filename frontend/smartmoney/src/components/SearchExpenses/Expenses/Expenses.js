import React from 'react';
import {useState, useEffect, useRef} from 'react';
import "./style.css";
import FlatList from 'flatlist-react';
import icons from "../../../functions/icons";
import { IoTrashOutline } from "@react-icons/all-files/io5/IoTrashOutline"; 

const Expenses = ({expenses,morePagesProps,loadMore,errorMessage,openPopUpEditExpense, openPopUpDeleteExpense, update}) => {

    const editExpense = (expense) => {
        openPopUpEditExpense(expense);
   }
   const deleteExpense = (expense) => {
    openPopUpDeleteExpense(expense);
    }

    const loadMoreExpenses = () => {
        loadMore();
    }


    const renderExpenses = (item, index)=> {
        return (
          <tr className = "categoriesRow" >
            <th className = "categoriesValue tableIcon" onClick={()=>editExpense(item)}>{icons(item.category__icon)}</th> 
            <th className = "categoriesValue tableDescription" onClick={()=>editExpense(item)}>{item.description}</th>
            <th className = "categoriesValue tableDate" onClick={()=>editExpense(item)}>{item.date.substring(0,10)}</th>
            <th className = "categoriesValue tableTotal" onClick={()=>editExpense(item)}>$ {item.value}</th>
            <th className = "categoriesValue tableDelete"><IoTrashOutline onClick={()=>deleteExpense(item)}/></th>
          </tr>        
        )  
    }

    return(
        <div className="cardContainer cardContainerExpenses">
            <div className="cardTitleContainer">
                <p className="cardTitle">Latest expenses</p>
                {/* <button className="cardViewAll">
                    <p>See all</p>
                    {icons("IoArrowForwardOutline")}
                </button> */} 
            </div>
            <table className = "categoriesHomeTable">
                <thead className = "categoriesHomeTableHead">
                    <tr className = "headCategoriesRow">
                        <th className = "tableIcon"></th>
                        <th className = "tableDescription">Description</th>
                        <th className = "tableDate">Date</th>
                        <th className = "tableTotal">Value</th>
                        <th className = "tableDelete"></th>
                    </tr>
                </thead>
                <tbody className = "categoriesHomeTableBody">
                    <FlatList 
                        list={expenses}
                        renderItem={renderExpenses}
                        hasMoreItems={morePagesProps}
                        loadMoreItems={loadMoreExpenses}
                        keyExtractor={(item) =>  item.id}
                        renderWhenEmpty={() => <tr><th><p>{errorMessage}</p></th></tr>}
                    />
                </tbody>
            </table>
        </div>
    )
}

export default Expenses