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
import icons from '../../../functions/icons';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


const PopUpBudgetConfirmation = ({closePopUp, budget, closeNewBudgetPopUp,openPopUpSessionExpired}) => {

    const confirmBudget = () => {
      const session = JSON.parse(localStorage.session);
      const requestOptionsNewExpense = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            code: session.code, 
            month: budget.month.getFullYear()+'-'+(budget.month.getMonth()+1)+'-'+1,
            categories: budget.categories,
        })
      };
      console.log(requestOptionsNewExpense.body)
      fetch('https://smart-money-back.herokuapp.com/create_budget/'+session.user_id+'/', requestOptionsNewExpense)
        .then((response) => {
          if(response.status===200){
              closeNewBudgetPopUp();
              closePopUp();
          }else{
            openPopUpSessionExpired()
          }
        });  

    }

    return (
        <div  className="popUpComponent">
            <button className="popUpBackground" onClick={closePopUp}/>
            <div className="confirmBudgetContainer">
                <button className="closeConfirmBudget" onClick={closePopUp}>X</button>
                <div className="divCenteredItems">
                <p className="popUpTitle">Are you sure?</p>
                <div className="confirmBudgetContent">
                  <p style={{marginBottom:20}}>You are about to create a budget for the current month.</p>
                  <p style={{marginBottom:20}}>Once it's created you can't modify it!</p>
                  <p className="confirmBudgetTotal">Total: $ {budget.total}</p>
                </div>

                <Stack 
                direction = 'column'
                marginTop = {5}
                justifyContent = 'center'
                alignItems="center" 
                spacing={2}>
                  <Button 
                  variant = 'contained'
                  size = 'small'
                  style={{width:230}}
                  //className="button1 popUpDeleteButton" 
                  onClick={closePopUp}>Let me double check it</Button>
                  <Button 
                  variant ='outlined'
                  size = 'small'
                  style={{width:230}}
                  //className="buttonconfirmBudget popUpDeleteButton" 
                  onClick={confirmBudget}>Yes, save budget</Button>

                </Stack>

              </div>
            </div>
        </div>
    )
}

export default PopUpBudgetConfirmation;