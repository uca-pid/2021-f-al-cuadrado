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

const PopUpCantCreateBudget = ({closePopUp}) => {

    return (
        <div className="popUpComponent">
            <button className="popUpBackground" onClick={closePopUp}/>
            <div className="cantCreateBudgetContainer">
                <button className="closeDeleteBudget" onClick={closePopUp}>X</button>
                <div className="divCenteredItems">
                <p className="popUpTitle">Ups!</p>
                <div className="cantCreateBudgetContent">
                  <p style={{marginBottom:20, textAlign:'center'}}>There is already a category with that name.</p>
                  <p style={{marginTop:20, textAlign:'center'}}>You can't have two categories that have the same name.</p>
                </div>
                <Stack 
                direction = 'row'
                justifyContent = 'center'
                alignItems="center" 
                spacing={2}>
                  <Button 
                  variant = 'contained'
                  size = 'small'
                  onClick={closePopUp}>OK!</Button>

                </Stack>
              </div>
            </div>
        </div>
    )
}

export default PopUpCantCreateBudget;