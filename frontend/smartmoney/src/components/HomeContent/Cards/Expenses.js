import React from 'react';
import {useState, useEffect} from 'react';
import "./style.css";
import FlatList from 'flatlist-react';
import icons from "../../../functions/icons";
import { IoTrashOutline } from "@react-icons/all-files/io5/IoTrashOutline"; 

const Expenses = ({searchExpenses,openPopUpEditExpense, openPopUpDeleteExpense, update, openPopUpSessionExpired}) => {

    const [expenses, setExpenses] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    function fetchExpenses(){
        const session = JSON.parse(localStorage.session);
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: session.code, from_item:0, up_to_item:20})
        };
        fetch('https://smart-money-back.herokuapp.com/expenses/'+session.user_id+'/', requestOptions)
            .then(response => {
                if(response.status===200){
                    return response.json()
                }else if (response.status===401){
                openPopUpSessionExpired()
                }
            })
            .then(data => {
                setExpenses(data.data);
                if(data.data.length===0)setErrorMessage("There is no expense yet!")
            })

    }
    useEffect(() => fetchExpenses(),[update])

    const editExpense = (expense) => {
        openPopUpEditExpense(expense);
   }
   const deleteExpense = (expense) => {
    openPopUpDeleteExpense(expense);
}

    const renderExpenses = (item, index)=> {
        return (
          <tr className = "categoriesRow" >
            <th className = "categoriesValue homeTableIcon" onClick={(event)=>{editExpense(item);event.stopPropagation()}}>{icons(item.category__icon)}</th> 
            <th className = "categoriesValue homeTableDescription" onClick={(event)=>{editExpense(item);event.stopPropagation()}}>{item.description}</th>
            <th className = "categoriesValue homeTableTotal" onClick={(event)=>{editExpense(item);event.stopPropagation()}}>$ {item.value}</th>
            <th className = "categoriesValue homeTableDelete"><IoTrashOutline onClick={(event)=>{deleteExpense(item);event.stopPropagation()}}/></th>
          </tr>        
        )  
    }

    return(
        <div className="cardContainer cardContainerHomeContent" onClick={searchExpenses}>
            <div className="cardTitleContainer">
                <p className="cardTitle">Latest expenses</p>
            </div>
            <table className = "categoriesHomeTable">
                <thead className = "categoriesHomeTableHead">
                    <tr className = "headCategoriesRow">
                        <th className = "homeTableIcon"></th>
                        <th className = "homeTableDescription">Description</th>
                        <th className = "homeTableTotal">Value</th>
                        <th className = "homeTableDelete"></th>
                    </tr>
                </thead>
                <tbody className = "expensesHomeTableBody">
                    <FlatList 
                        list={expenses}
                        renderItem={renderExpenses}
                        keyExtractor={(item) =>  item.id}
                        renderWhenEmpty={() => <tr><th><p>{errorMessage}</p></th></tr>}
                    />
                </tbody>
            </table>
        </div>
    )
}

export default Expenses