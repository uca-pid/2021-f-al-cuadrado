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

const categoryList=[
    'one', 'two', 'three'
  ];
  const defaultOption = categoryList[0];

const PopUpNewExpense = ({closePopUp}) => {

    const isMobileDevice = useMediaQuery({
        query: "(max-device-width: 480px)",
    });

    const [newExpense, setNewExpense] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [newExpenseOnlyNumbers, setNewExpenseOnlyNumbers] = useState(false);
    const [descriptionEmpty, setDescriptionEmpty] = useState(false);
    const [newExpenseEmpty, setNewExpenseEmpty] = useState(false);

    const submitExpense = () => {

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
                    <Dropdown options={categoryList} value={defaultOption} />
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