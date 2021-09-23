import React from 'react';
import {useState, useEffect} from 'react';
import "./style.css";
import webStyles from "../webStyles";
import mobilStyles from "../mobilStyles";
import { useMediaQuery } from 'react-responsive';
import FlatList from 'flatlist-react';
import icons from "../../../functions/icons";

const Expenses = ({openPopUpEditExpense}) => {

    const [expenses, setExpenses] = useState([]);

    function fetchExpenses(){
        const session = JSON.parse(localStorage.session);
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: session.code})
        };
        fetch('https://smart-money-back.herokuapp.com/expenses/'+session.user_id+'/', requestOptions)
          .then(response => response.json())
          .then(data => {setExpenses(data)});

    }
    useEffect(() => fetchExpenses(),[])

    const editExpense = (expense) => {
        openPopUpEditExpense(expense);
   }

    const renderExpenses = (item, index)=> {
        return (
          <tr className = "categoriesRow" onClick={()=>editExpense(item)}>
            <th className = "categoriesValue tableIcon">{icons(item.category__icon)}</th> 
            <th className = "categoriesValue tableDescription">{item.description}</th>
            <th className = "categoriesValue tableDate">{item.date.substring(0,10)}</th>
            <th className = "categoriesValue tableTotal">$ {item.value}</th>
          </tr>        
        )  
    }

    return(
        <div className="tableContainer">
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
                    </tr>
                </thead>
                <tbody className = "categoriesHomeTableBody">
                    <FlatList 
                        list={expenses}
                        renderItem={renderExpenses}
                        keyExtractor={(item) =>  item.id}
                        renderWhenEmpty={() => <tr><th><p>There is no expense yet!</p></th></tr>}
                    />
                </tbody>
            </table>
        </div>
    )
}

export default Expenses