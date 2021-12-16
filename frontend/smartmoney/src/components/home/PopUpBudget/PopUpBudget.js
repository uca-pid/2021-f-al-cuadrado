import React from 'react';
import "./style.css";
import {useState,useEffect} from 'react';
import icons from '../../../functions/icons';


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';import FlatList from 'flatlist-react';

import { IoArrowBack } from "@react-icons/all-files/io5/IoArrowBack"; 
import { IoTrashOutline } from "@react-icons/all-files/io5/IoTrashOutline";



const PopUpBudget = ({closePopUp, state, budgetToEdit, openPopUpDeleteBudget, confirmBudget, openPopUpCantCreateBudget,openPopUpSessionExpired}) => {

    const [title, setTitle] = useState('New budget');
    const [month, setMonth] = useState(new Date());
    const [categories, setCategories] = useState([]);
    const [update, setUpdate] = useState(false);
    const [total, setTotal] = useState(0);
    const [sinValores, setSinValores] = useState(false);

    const loadEditFiles = () =>{
      const session = JSON.parse(localStorage.session);
        if(state==='New'){
          const date = new Date();
            const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ code: session.code, month:date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()})
            };
            fetch('https://smart-money-back.herokuapp.com/categories/'+session.user_id+'/', requestOptions)
              
              .then(response => response.json())
              .then(data => {
                data.map(category => {
                    category.total = 0
                })
                setCategories(data);
              })
              .catch(error => {openPopUpSessionExpired()})
        }else{
          let dateAux = new Date(parseInt(budgetToEdit.budget__month.substring(0, 4)),parseInt(budgetToEdit.budget__month.substring(5, 7)-1));
          setTitle("Edit budget");
            setMonth(dateAux);
            console.log(dateAux.getFullYear()+'-'+(dateAux.getMonth()+1)+'-'+1)
            const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ code: session.code, month:dateAux.getFullYear()+'-'+(dateAux.getMonth()+1)+'-'+1})
            };
            fetch('https://smart-money-back.herokuapp.com/budget_details/'+session.user_id+'/', requestOptions)
              .then(response => response.json())
              .then(data => {
                setCategories(data);
                setTotal(budgetToEdit.total_budget);
              })
              .catch(error => console.log(error.info))
              
        }
      }
    useEffect(() => loadEditFiles(),[state, budgetToEdit])

    const submitBudget = () => {
      setSinValores(false)
      let errorCategoryNegative = false
      for (let i=0;i<categories.length;i++){
        if(categories[i].total<0)errorCategoryNegative=true;
      }
        if(total>0 && !errorCategoryNegative){
          (state==='New') ? submitNewBudget() : submitEditBudget();
        }else{
            setSinValores(true)
        }
      }

    const submitNewBudget = () => {
        const actualMonth = new Date();
        let categoryList = [];
        categories.map(category => {
          if(category.total>0)categoryList.push({category:category.name,value:parseInt(category.total)})
        })
        const session = JSON.parse(localStorage.session); 
        if((actualMonth.getFullYear()===month.getFullYear()) && (actualMonth.getMonth()===month.getMonth())){
          const requestOptionsNewExpense = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({code: session.code})
          };
          console.log(requestOptionsNewExpense.body)
          fetch('https://smart-money-back.herokuapp.com/active_budget/'+session.user_id+'/', requestOptionsNewExpense)
            .then((response) => {
              if(response.status===400){
                confirmBudget({
                  total: total,
                  categories: categoryList,
                  month: month
                });
              }
              if(response.status===200){
                openPopUpCantCreateBudget();
              }
              if(response.status===401){
                openPopUpSessionExpired();
              }
            });  
        }else{
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
              if(response.status===400){
                openPopUpCantCreateBudget();
              }
              if(response.status===401){
                openPopUpSessionExpired()
              }
              
            });  
                  
        }
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
          else{
            openPopUpSessionExpired()
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
                      <div style={{margin:0, width:'50%'}}>
                        <p style={{margin:0,textAlign:'right', fontWeight:'bolder', fontSize:20}}>Total: $ {total}</p>
                        {sinValores&&<p className="invalidCredentials" style={{margin:0,textAlign:'right'}}>Cat. be grater than 0</p>}
                      </div>
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
                                renderWhenEmpty={() => <tr><th><p></p></th></tr>}
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