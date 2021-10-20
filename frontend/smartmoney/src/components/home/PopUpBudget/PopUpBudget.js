import React, { cloneElement } from 'react';
import "./style.css";
import {useState,useEffect} from 'react';
import RequiredField from '../../RequiredField/requiredField';
import { useMediaQuery } from 'react-responsive';
import webStyles from "../webStyles";
import mobilStyles from "../mobilStyles";
import icons from '../../../functions/icons';
import IconList from '../../IconList';


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';import FlatList from 'flatlist-react';

import { IoArrowBack } from "@react-icons/all-files/io5/IoArrowBack"; 
import { IoTrashOutline } from "@react-icons/all-files/io5/IoTrashOutline";



const PopUpBudget = ({closePopUp, state, budgetToEdit, openPopUpDeleteBudget}) => {

    // const isMobileDevice = useMediaQuery({
    //     query: "(max-device-width: 480px)",
    // });

    const [title, setTitle] = useState('New budget');
    const [month, setMonth] = useState(new Date()); //#TODO: Revisar con fran
    const [categories, setCategories] = useState([]);
    const [update, setUpdate] = useState(false);
    const [total, setTotal] = useState(0);


    // const [name, setName] = useState('');
    // const [nameEmpty, setNameEmpty] = useState('');
    // const [iconEmpty, setIconEmpty] = useState('');
    // const [selectedIcon, setSelectedIcon] = useState('');

    const loadEditFiles = () =>{
      const session = JSON.parse(localStorage.session);
        if(state==='New'){
            const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ code: session.code, month:new Date().getMonth()})
            };
            fetch('https://smart-money-back.herokuapp.com/categories/'+session.user_id+'/', requestOptions)
              .then(response => response.json())
              .then(data => {
                data.map(category => {
                    category.total = 0
                })
                setCategories(data);
              })
        }else{
            setTitle("Edit budget");
            setMonth(new Date(parseInt(budgetToEdit.budget__month.substring(0, 4)),parseInt(budgetToEdit.budget__month.substring(5, 7)-1)));
            const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ code: session.code, month:budgetToEdit.budget__month.substring(0, 10)})
            };
            fetch('https://smart-money-back.herokuapp.com/budget_details/'+session.user_id+'/', requestOptions)
              .then(response => response.json())
              .then(data => {
                setCategories(data);
                setTotal(budgetToEdit.total_budget);
              })
        }
      }
    useEffect(() => loadEditFiles(),[state, budgetToEdit])

    const submitBudget = () => {
        (state==='New') ? submitNewBudget() : submitEditBudget();
      }

    const submitNewBudget = () => {
        let categoryList = [];
        categories.map(category => {
          if(category.total>0)categoryList.push({category:category.name,value:parseInt(category.total)})
        })
        const session = JSON.parse(localStorage.session);
        const requestOptionsNewExpense = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
              code: session.code, 
              month: month.getFullYear()+'-'+(month.getMonth()+1)+'-'+1,
              categories: categoryList,
          })
        };
        console.log(requestOptionsNewExpense.body)
        fetch('https://smart-money-back.herokuapp.com/create_budget/'+session.user_id+'/', requestOptionsNewExpense)
          .then((response) => {
            if(response.status===200){
                closePopUp();
            }
          });  
    }

    const submitEditBudget = () =>{
      let categoryList = [];
      categories.map(category => {
        if(category.total>0)categoryList.push({category:category.name,value:parseInt(category.total)})
      })
      const session = JSON.parse(localStorage.session);
      const requestOptionsNewExpense = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            code: session.code, 
            month: month.getFullYear()+'-'+(month.getMonth()+1)+'-'+1,
            categories: categoryList,
        })
      };
      console.log(requestOptionsNewExpense.body)
      fetch('https://smart-money-back.herokuapp.com/edit_budget/'+session.user_id+'/', requestOptionsNewExpense)
        .then((response) => {
          if(response.status===200){
              closePopUp();
          }
        }); 
    }

    const isNumber = (value) => {
      const numbers = /^[0-9]*$/;
      return numbers.test(value);
    }

    const setTotalBudget = () =>{
      let sum = 0;
      categories.map(category =>{
        console.log(isNumber(category.total))
        if(category.total)sum += parseInt(category.total);
      })
      setTotal(sum);
    }
    const renderCategories = (item)=> {
        let errorOnlyNumbers = false;
        return (
          <tr className = "budgetRow" key={item.name} >
            <th className = "categoriesValue tableIconBudget" >{icons(item.icon)}</th> 
            <th className = "categoriesValue tableCategoryBudget" >{item.name}</th>
            <th className = "categoriesValue tableTotalBudget" >
              
              <div style={{height:20, width:'100%', height:40, justifyContent:'center', display:'flex', flexDirection:'row', alignItems:'center'}}>
                <p style={{paddingRight:3}}>$</p>
                <TextField
                    variant = 'outlined' 
                    margin = "dense"
                    size ="small"
                    error = {errorOnlyNumbers}
                    //helperText = {newExpenseOnlyNumbers ? 'Only numbers' : newExpenseEmpty ? '* This field is required' : ''} 
                    type="text" 
                    style={{width:'80%', margin:0, padding:0}}
                    value={item.total} 
                    onChange={e => {item.total=e.target.value;setTotalBudget();setUpdate(!update)}} 
                    onFocus={()=>{errorOnlyNumbers = false}} 
                    onBlur={()=>{if(!isNumber(item.total))errorOnlyNumbers = true;}}
                    
                />
              </div>
            </th>
          </tr>        
        )  
    }

    return (
        <div className="popUpComponent">
            <button className="popUpBackground" onClick={closePopUp}/>
            <div className="budgetContainer">
                {(state==='New')&& <button className="closeBudget" onClick={closePopUp}>X</button>}
                {(state==='Edit')&& <IoArrowBack className="closeBudgetArrow" onClick={closePopUp}/>}
                {(state==='Edit')&& <IoTrashOutline className="deleteBudgetIcon" onClick={()=>{closePopUp();openPopUpDeleteBudget(budgetToEdit)}}/>}
                <div className="divCenteredItems">
                <p className="popUpTitle">{title}</p>
                 <div className="divBudget">
                    <div style={{width:'90%', display:'flex', flexDirection:'row', alignItems:'center'}}>
                      <LocalizationProvider dateAdapter={AdapterDateFns} >
                        <DatePicker 
                            views={['year', 'month']}
                            label = 'Month'
                            value={month}
                            minDate={new Date()} 
                            
                            onChange={(date) => setMonth(date)} 
                            renderInput={(params) => 
                                <TextField margin = 'dense'
                                size = "small" {...params} />}
                        /> 
                      </LocalizationProvider>
                      <p style={{margin:0, width:'50%', textAlign:'right', fontWeight:'bolder', fontSize:20}}>Total: $ {total}</p>
                    </div>
                    <table className = "categoriesPopUpBudget">
                        <thead className = "categoriesPopUpBudgetHead">
                            <tr className = "headPopUpBudgetRow">
                                <th className = "tableIconBudget"></th>
                                <th className = "tableCategoryBudget">Category</th>
                                <th className = "tableTotalBudget">Total</th>
                            </tr>
                        </thead>
                        <tbody className = "categoriesPopUpBudgetBody">
                            <FlatList 
                                list={categories}
                                renderItem={renderCategories}
                            />
                        </tbody>
                    </table>

                    <Button 
                    style = {{ width:'50%'}}
                    variant = 'contained'
                    type="button" 
                    className="button1"
                    type="button" 
                    onClick={submitBudget}  
                    // disabled={nameEmpty||iconEmpty}
                    >
                    Save
                    </Button> 
                    
                </div> 
                </div>
            </div>
        </div>
    )
}

export default PopUpBudget