import React from 'react';
import "./style.css";
import {useState, useEffect} from 'react';
import { IoPencil} from "@react-icons/all-files/io5/IoPencil"; 
import { IoTrashOutline } from "@react-icons/all-files/io5/IoTrashOutline"; 
import FlatList from 'flatlist-react';
import { monthsNamesShort } from '../../../constants/monthsNamesShort';


const PopUpEditBudgets = ({closePopUp, openPopUpEditBudget, openPopUpDeleteBudget, update}) => {

    
    const [futureBudgets, setFutureBudgets] = useState([]);
    const [errorMessage, setErrorMessage] = useState('')

    const getFutureBudgets = () => {
        //let categories = [];
        const session = JSON.parse(localStorage.session);
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: session.code})
        };
        fetch('https://smart-money-back.herokuapp.com/future_budgets/'+session.user_id+'/', requestOptions)
          .then(response => response.json())
          .then(data => {
            setFutureBudgets(data);
            console.log(data)
            if(data.length===0)setErrorMessage("There is no future budget yet!")
          })
        

    }
    useEffect(() => getFutureBudgets(),[update])

    const renderBudget = (item)=> {
        return (
          <tr className = "futureBudgetRow" onClick={()=>openPopUpEditBudget(item)}>
            <th className = "borderBottomRow tableMontWidth">{monthsNamesShort[parseInt(item.budget__month.substring(5, 7))-1]}, {item.budget__month.substring(0, 4)}</th>
            <th className = "borderBottomRow tableTotalWidth">${item.total_budget}</th>
            <th className = "borderBottomRow tableEditWidth"><IoPencil className="editBudgetIconTable"/></th>
            <th className = "borderBottomRow tableDeleteWidth"><IoTrashOutline className="deleteBudgetIconTable" onClick={(event)=>{openPopUpDeleteBudget(item);event.stopPropagation()}}/></th>
          </tr>        
        )  
    }

    return (
        <div className="popUpComponent">
            <button className="popUpBackground" onClick={closePopUp}/>
            <div className="editBudgetsContainer">
                <button className="closeEditBudgets" onClick={closePopUp}>X</button>
                <div className="divCenteredItems">
                    <p className="popUpTitle">Edit budgets</p>
                    <table className = "editBudgetsTable">
                        <tbody className = "editBudgetsBody">
                            <FlatList 
                                list={futureBudgets}
                                renderItem={renderBudget}
                                keyExtractor={(item) =>  item.id}
                                renderWhenEmpty={() => <tr><th><p>{errorMessage}</p></th></tr>}
                            />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default PopUpEditBudgets;