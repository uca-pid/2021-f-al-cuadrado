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
import DatePicker from '@mui/lab/DatePicker';
import FlatList from 'flatlist-react';




const PopUpBudget = ({closePopUp, state, budgetToEdit}) => {

    // const isMobileDevice = useMediaQuery({
    //     query: "(max-device-width: 480px)",
    // });

    const [title, setTitle] = useState('New budget');
    const [month, setMonth] = useState(new Date(new Date().getFullYear(), 0, 1)); //#TODO: Revisar con fran
    const [categories, setCategories] = useState([]);

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
                setCategories({...data});
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
    }

    const submitEditBudget = () =>{
      }

    
    const renderCategories = (item)=> {
        // let total = 0;
        // if (item.total!==null) total = item.total;
        return (
          <tr className = "categoriesRow" key={item.name} >
            <th className = "categoriesValue tableIconBudget" >{icons(item.icon)}</th> 
            <th className = "categoriesValue tableCategoryBudget" >{item.name}</th>
            <th className = "categoriesValue tableTotalBudget" >$ {item.budget}</th>
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
                     
                    {/* <DatePicker 
                        views={['year', 'month']}
                        label = 'Month'
                        value={month}
                        minDate={new Date()} 
                        onChange={(date) => setMonth(date)} 
                        renderInput={(params) => 
                            <TextField margin = 'dense'
                            size = "small" {...params} />}
                    /> */}
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
                                //renderWhenEmpty={() => <tr><th><p>There is no expense yet!</p></th></tr>}
                            />
                        </tbody>
                    </table>
                    <Button 
                    style = {{marginTop: '5%', width:'50%'}}
                    variant = 'contained'
                    type="button" 
                    className="button1"
                    type="button" 
                    // onClick={submitCategory}  
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