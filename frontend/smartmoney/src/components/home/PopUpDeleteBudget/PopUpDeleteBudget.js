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

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { monthsNamesShort } from '../../../constants/monthsNamesShort';

const PopUpDeleteBudget = ({closePopUp, budgetToDelete}) => {

    const deleteBudget = () => {
      console.log(budgetToDelete)
      const session = JSON.parse(localStorage.session);
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          code: session.code,
          month: budgetToDelete.budget__month.substring(0,10)
        })
      };
      console.log(requestOptions.body)
      fetch('https://smart-money-back.herokuapp.com/delete_budget/'+session.user_id+'/', requestOptions)
        .then(() => closePopUp());

    }

    return (
        <div className="popUpComponent">
            <button className="popUpBackground" onClick={closePopUp}/>
            <div className="deleteBudgetContainer">
                <button className="closeDeleteBudget" onClick={closePopUp}>X</button>
                <div className="divCenteredItems">
                <p className="popUpTitle">Are you sure?</p>
                <div className="deleteBudgetContent">
                  <p style={{marginBottom:20}}>You are about to delete te following budget:</p>

                  <p className="budgetToDelete">Month: {monthsNamesShort[parseInt(budgetToDelete.budget__month.substring(5, 7))-1]}, {budgetToDelete.budget__month.substring(0, 4)}</p>
                  <p className="budgetToDelete">Total: ${budgetToDelete.total_budget}</p>

                  <p style={{marginTop:20}}>Once you delete it there's no coming back!</p>
                </div>
                <Stack 
                direction = 'row'
                justifyContent = 'center'
                alignItems="center" 
                spacing={2}>
                  <Button 
                  variant = 'contained'
                  size = 'small'
                  //className="button1 popUpDeleteButton" 
                  onClick={closePopUp}>Don't delete it</Button>
                  <Button 
                  variant ='outlined'
                  size = 'small'
                  //className="buttonDeleteCategory popUpDeleteButton" 
                  onClick={deleteBudget}>Yes, delete it</Button>

                </Stack>
              </div>
            </div>
        </div>
    )
}

export default PopUpDeleteBudget;