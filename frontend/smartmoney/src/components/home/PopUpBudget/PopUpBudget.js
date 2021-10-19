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




const PopUpBudget = ({closePopUp, state, budgetToEdit}) => {

    // const isMobileDevice = useMediaQuery({
    //     query: "(max-device-width: 480px)",
    // });

    const [title, setTitle] = useState('New budget');
    const [month, setMonth] = useState(new Date()); //#TODO: Revisar con fran
    const [categories, setCategories] = useState([]);
    const [update, setUpdate] = useState(false);


    // const [name, setName] = useState('');
    // const [nameEmpty, setNameEmpty] = useState('');
    // const [iconEmpty, setIconEmpty] = useState('');
    // const [selectedIcon, setSelectedIcon] = useState('');

    const loadEditFiles = () =>{
        if(state==='New'){
            //let categoriesAux = [];
            const session = JSON.parse(localStorage.session);
            const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ code: session.code, month:new Date().getMonth()})
            };
            fetch('https://smart-money-back.herokuapp.com/categories/'+session.user_id+'/', requestOptions)
              .then(response => response.json())
              .then(data => {
                data.map(category => {
                    category.budget = 0
                })
                setCategories(data);
              })
        }else{
            setTitle("Edit category")
            //   setName(categoryToEdit.name);
            //   setSelectedIcon(categoryToEdit.icon);
        }
      }
    useEffect(() => loadEditFiles(),[state, budgetToEdit])

    const submitBudget = () => {
        (state==='New') ? submitNewBudget() : submitEditBudget();
      }

    const submitNewBudget = () => {
        let categoryList = [];
        console.log(categories)
        categories.map(category => {
          if(category.budget>0)categoryList.push({category:category.name,value:parseInt(category.budget)})
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
    }

    const submitEditBudget = () =>{
      }

    const isNumber = (value) => {
      const numbers = /^[0-9]*$/;
      return numbers.test(value);
    }
    const renderCategories = (item, index)=> {
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
                    value={item.budget} 
                    onChange={e => {item.budget=e.target.value;setUpdate(!update)}} 
                    onFocus={()=>{errorOnlyNumbers = false}} 
                    onBlur={()=>{if(!isNumber(item.budget))errorOnlyNumbers = true;}}
                    
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
                <button className="closeBudget" onClick={closePopUp}>X</button>
                <div className="divCenteredItems">
                <p className="popUpTitle">{title}</p>
                 <div className="divBudget">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
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