import React from 'react';
import "./style.css";
import "react-datepicker/dist/react-datepicker.css";
import 'react-dropdown/style.css';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const PopUpCantCreateBudget = ({closePopUp}) => {

    return (
        <div className="popUpComponent">
            <button className="popUpBackground" onClick={closePopUp}/>
            <div className="cantCreateBudgetContainer">
                <button className="closeDeleteBudget" onClick={closePopUp}>X</button>
                <div className="divCenteredItems">
                <p className="popUpTitle">Ups!</p>
                <div className="cantCreateBudgetContent">
                  <p style={{marginBottom:20, textAlign:'center'}}>There is already a budget for that period.</p>
                  <p style={{marginTop:20, textAlign:'center'}}>You can't have more than one budget per month.</p>
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