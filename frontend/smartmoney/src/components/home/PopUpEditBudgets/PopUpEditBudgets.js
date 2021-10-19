import React from 'react';
import "./style.css";
import {useState, useEffect} from 'react';
import { IoPencil} from "@react-icons/all-files/io5/IoPencil"; 
import { IoTrashOutline } from "@react-icons/all-files/io5/IoTrashOutline"; 
import FlatList from 'flatlist-react';

const PopUpEditBudgets = ({closePopUp, openPopUpEditBudget, openPopUpDeleteBudget, update}) => {

    
    const [futureBudgets, setFutureBudgets] = useState([]);

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
              
            // data.map(category => {
            //     if(category.user_id!==null){
            //         categories.push(category)
            //     }
            // })
            setFutureBudgets(data);
            console.log(data)
          })
        

    }
    //useEffect(() => getFutureBudgets(),[update])

    const renderBudget = (item)=> {
        return (
          <tr className = "futureBudgetRow" onClick={()=>openPopUpEditBudget(item)}>
            <th className = "borderBottomRow tableMontWidth">{item.month}</th>
            <th className = "borderBottomRow tableTotalWidth">${item.total}</th>
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
                                renderWhenEmpty={() => <tr><th><p>There is no future budget yet!</p></th></tr>}
                            />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default PopUpEditBudgets;