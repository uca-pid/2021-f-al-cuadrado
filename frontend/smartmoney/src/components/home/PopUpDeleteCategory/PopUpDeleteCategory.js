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
        <div className="popUpComponent">
            <button className="popUpBackground" onClick={closePopUp}/>
            <div className="deleteCategoryContainer">
                <button className="closeDeleteCategory" onClick={closePopUp}>X</button>
                <div className="divCenteredItems">
                <p className="popUpTitle">Are you sure?</p>
                <div className="deleteCategoryContent">
                  <p style={{marginBottom:20}}>You are about to delete te following category:</p>

                  <p className="categoryToDelete">{icons(categoryToDelete.icon)} {categoryToDelete.name}</p>

                  <p style={{marginTop:20}}>Once you delete it all the expenses that were in this categpry will appear in "Others"!</p>
                </div>

                <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-around', width:'90%'}}>
                  <button className="button1 popUpDeleteButton" onClick={closePopUp}>Don't delete it</button>
                  <button className="buttonDeleteCategory popUpDeleteButton" onClick={deleteCategory}>Yes, delete it</button>

                </div>

              </div>
            </div>
        </div>
    )
}

export default PopUpDeleteCategory;