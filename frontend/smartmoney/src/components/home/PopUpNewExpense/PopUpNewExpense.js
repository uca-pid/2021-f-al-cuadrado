import React from 'react';
import "./style.css";
import {useState, useEffect} from 'react';
import RequiredField from '../../RequiredField/requiredField';
import { useMediaQuery } from 'react-responsive';
import webStyles from "../webStyles";
import mobilStyles from "../mobilStyles";
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';





const PopUpNewExpense = ({closePopUp, state, expenseToEdit}) => {

    const isMobileDevice = useMediaQuery({
        query: "(max-device-width: 480px)",
    });

    const allCategories = localStorage.allCategories.split(',');
    const [selectedOption, setSelectedOption] = useState('');
    const [expenseValue, setExpenseValue] = useState('');
    const [title, setTitle] = useState('New expense');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [newExpenseOnlyNumbers, setNewExpenseOnlyNumbers] = useState(false);
    const [descriptionEmpty, setDescriptionEmpty] = useState(false);
    const [categoryEmpty, setCategoryEmpty] = useState(false);
    const [newExpenseEmpty, setNewExpenseEmpty] = useState(false);

  
    const loadCategories = () => {
          let items = allCategories.map((item, index) => {
            return <MenuItem value={item}>{item}</MenuItem>
          });
          return items
    }

    const loadEditFiles = () =>{
      if(state==='Edit'){
        let editDate = new Date(expenseToEdit.date.substring(0,10));
        editDate.setDate(editDate.getDate() + 1);
        setTitle("Edit expense")
        setExpenseValue(expenseToEdit.value);
        setDescription(expenseToEdit.description);
        setSelectedOption(expenseToEdit.category__name);
        setDate(editDate);
      }
    }
    useEffect(() => loadEditFiles(),[state, expenseToEdit])

    const submitExpense = () => {
      (state==='New') ? submitNewExpense() : submitEditExpense();
    }

    const submitNewExpense = () =>{
        const onlyNumbers = /^[0-9]*$/;
        if(description==='')setDescriptionEmpty(true);
        if(selectedOption==='' )setCategoryEmpty(true);
        if(onlyNumbers.test(expenseValue) && description!=='' && selectedOption!==''){
          const session = JSON.parse(localStorage.session);
          const requestOptionsNewExpense = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                code: session.code, 
                value: expenseValue,
                description: description,
                category: selectedOption,
                date: date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(),
            })
          };
          console.log(requestOptionsNewExpense)
          fetch('https://smart-money-back.herokuapp.com/new_expense/'+session.user_id+'/', requestOptionsNewExpense)
            .then((response) => {
              if(response.status===201){
                  closePopUp();
                //#TODO: Actualizar lista de consumos y de categorias
                // const requestOptionsExpenses = {
                //   method: 'POST',
                //   headers: { 'Content-Type': 'application/json' },
                //   body: JSON.stringify({ code: session.code})
                // };
                // fetch('https://smart-money-back.herokuapp.com/expenses/'+session.user_id+'/', requestOptionsExpenses)
                //   .then(response => response.json())
                //   .then(data => setConsumos(data));
              }
            });
        }else{
          setNewExpenseOnlyNumbers(true)
        }   
    } 
    const submitEditExpense = () =>{
      const onlyNumbers = /^[0-9]*$/;
      if(description==='')setDescriptionEmpty(true);
      if(onlyNumbers.test(expenseValue) && description!==''){
        const session = JSON.parse(localStorage.session);
        const requestOptionsNewExpense = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
              code: session.code, 
              expense_id: expenseToEdit.id,
              value: expenseValue,
              description: description,
              category: selectedOption,
              date: date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(),
          })
        };
        console.log(requestOptionsNewExpense.body)
        fetch('https://smart-money-back.herokuapp.com/edit_expense/'+session.user_id+'/', requestOptionsNewExpense)
          .then((response) => {
            if(response.status===200){
                closePopUp();
            }
          });
      }else{
        setNewExpenseOnlyNumbers(true)
      }   
    }

    function isEmpty(input, isEmpty){
        if(input==='')isEmpty(true)
    }

    return (
        <div className="popUpComponent">
            <button className="popUpBackground" onClick={closePopUp}/>
            <div className="newExpenseContainer">
                <button className="closeNewExpense" onClick={closePopUp}>X</button>
                <div className="divCenteredItems">
                <p className="popUpTitle">{title}</p>
                <form className="formNewExpense">
                    <p className="label"></p>
                    <TextField
                    label = "Value" variant = 'outlined' 
                    margin = "dense"
                    size ="small"
                    required
                    error = {newExpenseOnlyNumbers || newExpenseEmpty}
                    helperText = {newExpenseOnlyNumbers ? 'Only numbers' : newExpenseEmpty ? '* This field is required' : ''} 
                    //style={isMobileDevice ? (newExpenseEmpty ? mobilStyles.inputEmpty : mobilStyles.input) : (newExpenseEmpty ? webStyles.inputEmpty : webStyles.input)} 
                    type="text" 
                    value={expenseValue} 
                    onChange={e => setExpenseValue(e.target.value)} 
                    onFocus={()=>{setNewExpenseOnlyNumbers(false);setNewExpenseEmpty(false)}} 
                    onBlur={()=>isEmpty(expenseValue,setNewExpenseEmpty)}/>
                    <TextField
                    label = "Description" variant = 'outlined' 
                    margin = "dense"
                    size ="small" 
                    required
                    error = {descriptionEmpty}
                    helperText = {descriptionEmpty ? '* This field is required' : ''} 
                    //style={isMobileDevice ? (descriptionEmpty ? mobilStyles.inputEmpty : mobilStyles.input) : (descriptionEmpty ? webStyles.inputEmpty : webStyles.input)} 
                    type="text" 
                    value={description} 
                    onChange={e => setDescription(e.target.value)}  
                    onFocus={()=>setDescriptionEmpty(false)} 
                    onBlur={()=>isEmpty(description,setDescriptionEmpty)}/>
                    <TextField 
                    label="Category" 
                    select required
                    margin = "dense"
                    //options={allCategories} 
                    labelId = 'label'
                    size = 'small'
                    value={selectedOption} 
                    onChange={event=>{setSelectedOption(event.target.value);setCategoryEmpty(false);console.log(event.target.value)}}>
                    {loadCategories()}
                    </TextField>
                    {categoryEmpty&&<RequiredField/>}
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker 
                      label = 'Date'
                      value={date} 
                      onChange={(date) => setDate(date)} 
                      renderInput={(params) => 
                        <TextField margin = 'dense'
                        size = "small" {...params} />}/>
                    </LocalizationProvider>
                    <Button 
                    variant = 'contained'
                    style = {{marginTop: '5%'}}
                    onClick={submitExpense} 
                    disabled={newExpenseEmpty||descriptionEmpty}>
                      Save
                    </Button>
                </form>
                </div>
            </div>
        </div>
    )
}

export default PopUpNewExpense;