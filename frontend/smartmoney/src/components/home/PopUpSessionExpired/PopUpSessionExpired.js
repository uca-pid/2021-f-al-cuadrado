import React from 'react';
import "./style.css";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const PopUpSessionExpired = () => {

    const close = () => {
      window.location.href = "./"
    }

    return (
        <div className="popUpComponent">
            <button className="popUpBackground" onClick={()=>{close()}}/>
            <div className="cantCreateBudgetContainer">
                <div className="divCenteredItems">
                <p style={{marginTop:40}} className="popUpTitle">Ups!</p>
                <div className="cantCreateBudgetContent">
                  <p style={{marginBottom:20, textAlign:'center'}}>The session has expired.</p>
                  <p style={{marginTop:20, textAlign:'center'}}>Please login again.</p>
                </div>
                <Stack 
                direction = 'row'
                justifyContent = 'center'
                alignItems="center" 
                spacing={2}>
                  <Button 
                  variant = 'contained'
                  size = 'small'
                  onClick={()=>{close()}}>OK!</Button>
                </Stack>
              </div>
            </div>
        </div>
    )
}

export default PopUpSessionExpired;