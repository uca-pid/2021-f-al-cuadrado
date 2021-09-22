import React from 'react';
import "./style.css";
import {useState} from 'react';
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

const PopUpNewExpense = ({closePopUp}) => {

    const isMobileDevice = useMediaQuery({
        query: "(max-device-width: 480px)",
    });

    const allCategories = localStorage.allCategories.split(',');
    const [selectedOption, setSelectedOption] = useState(allCategories[0]);

    const [newExpense, setNewExpense] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [newExpenseOnlyNumbers, setNewExpenseOnlyNumbers] = useState(false);
    const [descriptionEmpty, setDescriptionEmpty] = useState(false);
    const [newExpenseEmpty, setNewExpenseEmpty] = useState(false);

    const submitExpense = () => {
        const onlyNumbers = /^[0-9]*$/;
        if(onlyNumbers.test(newExpense)){
          const session = JSON.parse(localStorage.session);
          const requestOptionsNewExpense = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                code: session.code, 
                value: newExpense,
                description: description,
                category: selectedOption.value,
                date: date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(),
            })
          };
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

    function isEmpty(input, isEmpty){
        if(input==='')isEmpty(true)
    }

    return (
        <div className="popUpComponent">
            <button className="popUpBackground" onClick={closePopUp}/>
            <div className="newExpenseContainer">
                <button className="closeNewExpense" onClick={closePopUp}>X</button>
                <div className="divCenteredItems">
                <form className="formNewExpense">
                    <p className="label">Value</p>
                    <input style={isMobileDevice ? (newExpenseEmpty ? mobilStyles.inputEmpty : mobilStyles.input) : (newExpenseEmpty ? webStyles.inputEmpty : webStyles.input)} type="text" value={newExpense} onChange={e => setNewExpense(e.target.value)} onFocus={()=>setNewExpenseOnlyNumbers(false)} onBlur={()=>isEmpty(newExpense,setNewExpenseEmpty)}/>
                    {newExpenseOnlyNumbers&&<p className = "invalidCredentials">Only numbers</p>}
                    {newExpenseEmpty&&<RequiredField/>}
                    <p className="label">Description</p>
                    <input style={isMobileDevice ? (descriptionEmpty ? mobilStyles.inputEmpty : mobilStyles.input) : (descriptionEmpty ? webStyles.inputEmpty : webStyles.input)} type="text" value={description} onChange={e => setDescription(e.target.value)}  onFocus={()=>setDescriptionEmpty(false)} onBlur={()=>isEmpty(description,setDescriptionEmpty)}/>
                    {descriptionEmpty&&<RequiredField/>}
                    <p className="label">Category</p>
                    <Dropdown options={allCategories} value={selectedOption} onChange={value=>{setSelectedOption(value)}}/>
                    <p className="label">Date</p>
                    <DatePicker selected={date} onChange={(date) => setDate(date)} />
                    <input 
                    className="button1"
                    type="button" 
                    onClick={submitExpense} 
                    value="Save" 
                    disabled={newExpenseEmpty||descriptionEmpty}/>
                </form>
                </div>
            </div>
        </div>
    )
}

export default PopUpNewExpense;