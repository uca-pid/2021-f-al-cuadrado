import React from 'react';
import {useState, useEffect} from 'react';
import "./style.css";
import webStyles from "../webStyles";
import mobilStyles from "../mobilStyles";
import { useMediaQuery } from 'react-responsive';
import FlatList from 'flatlist-react';
import icons from "../../../functions/icons";
// import TableScrollbar from 'react-table-scrollbar';

const PopUpCategoryDetails = ({categoryName, closePopUp, openPopUpEditExpense}) => {

    const [expenses, setExpenses] = useState([]);

    const categoryDetails = () => {
        const session = JSON.parse(localStorage.session);
        const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            code: session.code,
            category:categoryName})
        };
        fetch('https://smart-money-back.herokuapp.com/category_expenses/'+session.user_id+'/', requestOptions)
        .then(response => response.json())
        .then(data => {
            setExpenses(data);
            });
   }
   useEffect(() => categoryDetails(),[])

   const editExpense = (expense) => {
       let expenseToEdit = expense;
       expenseToEdit.category__name = categoryName;
       console.log(expenseToEdit)
        openPopUpEditExpense(expenseToEdit);
}

    const renderExpenses = (item, index)=> {
        return (
          <tr className = "categoryDetailsRow" onClick={()=>editExpense(item)}>
            <th className = "categoriesValue tableCategoryDescription">{item.description}</th>
            <th className = "categoriesValue tableCategoryDate">{item.date.substring(0,10)}</th>
            <th className = "categoriesValue tableCategoryTotal">$ {item.value}</th>
          </tr>        
        )  
    }

    return(
        <div className="popUpComponent">
            <button className="popUpBackground" onClick={closePopUp}/>
            <div className="categoryDetailsContainer">
                <button className="closeCategoryDetails" onClick={closePopUp}>X</button>
                
                <div className="divCenteredItems">
                <p className="popUpTitle">{categoryName}</p>
            <table className = "categoryDetailsTable">
                <thead className = "categoryDetailsTableHead">
                    <tr className = "headCategoryDetailsRow">
                        <th className = "tableCategoryDescription">Description</th>
                        <th className = "tableCategoryDate">Date</th>
                        <th className = "tableCategoryTotal">Value</th>
                    </tr>
                </thead>
                <tbody className = "categoryDetailsTableBody">
                    <FlatList 
                        list={expenses}
                        renderItem={renderExpenses}
                        keyExtractor={(item) =>  item.id}
                        renderWhenEmpty={() => <tr><th><p>There is no expense yet!</p></th></tr>}
                    />
                </tbody>
            </table>
        </div>
            </div>
        </div>
    )
}

export default PopUpCategoryDetails