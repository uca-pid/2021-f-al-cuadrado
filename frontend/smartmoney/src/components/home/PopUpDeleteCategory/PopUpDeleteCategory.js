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


const PopUpDeleteCategory = ({closePopUp, categoryToDelete, deleted}) => {

    const deleteCategory = () => {
      const session = JSON.parse(localStorage.session);
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          code: session.code,
          category_id: categoryToDelete.id
        })
      };
      console.log(requestOptions.body)
      fetch('https://smart-money-back.herokuapp.com/delete_category/'+session.user_id+'/', requestOptions)
        .then(() => {deleted();closePopUp()});

    }

    return (
        <div  className="popUpComponent">
            <button className="popUpBackground" onClick={closePopUp}/>
            <div className="deleteCategoryContainer">
                <button className="closeDeleteCategory" onClick={closePopUp}>X</button>
                <div className="divCenteredItems">
                <p className="popUpTitle">Are you sure?</p>
                <div className="deleteCategoryContent">
                  <p style={{marginBottom:20}}>You are about to delete te following category:</p>

                  <p className="categoryToDelete">{icons(categoryToDelete.icon)} {categoryToDelete.name}</p>

                  <p style={{marginTop:20}}>Once you delete it all the expenses that were in this category will appear in "Others"!</p>
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
                  onClick={deleteCategory}>Yes, delete it</Button>

                </Stack>

              </div>
            </div>
        </div>
    )
}

export default PopUpDeleteCategory;