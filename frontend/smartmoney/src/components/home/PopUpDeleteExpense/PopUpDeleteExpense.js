import React from 'react';
import "./style.css";
import {useState, useEffect} from 'react';
import RequiredField from '../../RequiredField/requiredField';
import { useMediaQuery } from 'react-responsive';
import webStyles from "../webStyles";
import mobilStyles from "../mobilStyles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

// const categoryList=[
//     'one', 'two', 'three'
//   ];
//   const defaultOption = categoryList[0];

const PopUpDeleteExpense = ({closePopUp, expenseToDelete}) => {

    const deleteExpense = () => {
      const session = JSON.parse(localStorage.session);
      console.log(expenseToDelete)
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          code: session.code,
          expense_id: expenseToDelete.id
        })
      };
      console.log(requestOptions.body)
      fetch('https://smart-money-back.herokuapp.com/delete_expense/'+session.user_id+'/', requestOptions)
        .then(() => closePopUp());

    }

    return (
        <div className="popUpComponent">
            <button className="popUpBackground" onClick={closePopUp}/>
            <div className="deleteExpenseContainer">
                <button className="closeDeleteExpense" onClick={closePopUp}>X</button>
                <div className="divCenteredItems">
                <p className="popUpTitle">Are you sure?</p>
                <div className="deleteExpenseContent">
                  <p style={{marginBottom:20}}>You are about to delete te following expense:</p>

                  <p className="expenseToDelete">Name: {expenseToDelete.description}</p>
                  <p className="expenseToDelete">Category: {expenseToDelete.category__name}</p>
                  <p className="expenseToDelete">Value: ${expenseToDelete.value}</p>
                  <p className="expenseToDelete">Creation date: {expenseToDelete.date.substring(0,10)}</p>

                  <p style={{marginTop:20}}>Once you delete it there's no coming back!</p>
                </div>

                <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-around', width:'90%'}}>
                  <button className="button1 popUpDeleteButton" onClick={closePopUp}>Don't delete it</button>
                  <button className="buttonDeleteExpense popUpDeleteButton" onClick={deleteExpense}>Yes, delete it</button>

                </div>

              </div>
            </div>
        </div>
    )
}

export default PopUpDeleteExpense;