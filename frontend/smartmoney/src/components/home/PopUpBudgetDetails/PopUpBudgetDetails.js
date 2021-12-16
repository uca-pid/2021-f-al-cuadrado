import React from 'react';
import {useState, useEffect} from 'react';
import "./style.css";
import FlatList from 'flatlist-react';
import icons from "../../../functions/icons";
import { monthsNamesShort } from '../../../constants/monthsNamesShort';

const PopUpBudgetDetails = ({month, closePopUp,openPopUpSessionExpired}) => {

    const [categories, setCategories] = useState([]);
    const [budget, setBudget] = useState(0);
    const [spent, setSpent] = useState(0);
    const [diference, setDiference] = useState(0);
    const [green, setGreen] = useState(true);

    const budgetDetails = () => {
        const session = JSON.parse(localStorage.session);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                  code: session.code,
                  month: month.getFullYear()+'-'+(month.getMonth()+1)+'-'+1,
              })
          };
          fetch('https://smart-money-back.herokuapp.com/budget_details/'+session.user_id+'/', requestOptions)
            .then(response => {
                if(response.status===200){
                    return response.json()
                }else if (response.status===401){
                openPopUpSessionExpired()
                }
            })
            .then(data => {
                let totalBudget = 0;
                let totalSpent = 0;
                setCategories(data)
                data.map(category =>{
                    totalBudget += category.total;
                    totalSpent += category.total_spent;
                })
                setBudget(totalBudget);
                setSpent(totalSpent);
                setDiference((totalSpent*100/totalBudget).toFixed(0));
                setGreen((totalBudget-totalSpent)>=0);
              })
   }

   useEffect(() => budgetDetails(),[])

   const renderCategories = (item, index)=> {
    let dif = item.total-item.total_spent;
    let green = true;
    if (dif<0){
        dif = item.total_spent-item.total;
        green = false;
    }
    return (
      <tr className = "categoriesBudgetRow" key={item.name} >
        <th className = "categoriesValue tableHomeBudgetIcon" >{icons(item.icon)}</th> 
        <th className = "categoriesValue tableHomeBudgetCategory" >{item.name}</th>
        <th className = "categoriesValue tableHomeBudgetNumber" >$ {item.total_spent}</th>
        <th className = "categoriesValue tableHomeBudgetNumber" >$ {item.total}</th>
        <th style={green ? {color:'green'} : {color:'red'}} className = "categoriesValue tableHomeBudgetNumber" >$ {dif}</th>
      </tr>        
    )  
}

    return(
        <div className="popUpComponent">
            <button className="popUpBackground" onClick={closePopUp}/>
            <div className="categoryDetailsContainer">
                <button className="closeBudgetDetails" onClick={closePopUp}>X</button>
                <div className="divCenteredItems">
                    <p className="popUpTitle">Budget {monthsNamesShort[month.getMonth()]}, {month.getFullYear()}</p>
                    <div style={{width:'100%', display:'flex',flexDirection:'row', justifyContent:'space-around', marginTop:10}}>
                        <div >
                            <p style={{margin:0, fontSize:12}}>Spent:</p>
                            <p style={green ? {fontSize:25, margin:0, fontWeight:'bold',color:'green'} : {fontSize:25, margin:0, fontWeight:'bold',color:'red'}}>{diference} %</p>
                        </div>
                        <div >
                            <p style={{margin:0, fontSize:12}}>Spent:</p>
                            <p style={{margin:0, fontSize:25}}>$ {spent}</p>
                        </div>
                        <div >
                            <p style={{margin:0, fontSize:12}}>Budget:</p>
                            <p style={{margin:0, fontSize:25}}>$ {budget}</p>
                        </div>
                    </div>
                    <table className = "categoriesBudgetDetails" >
                        <thead className = "budgetBudgetDetailsHead">
                            <tr className = "headCategoriesRow">
                                <th className = "tableHomeBudgetIcon"></th>
                                <th className = "tableHomeBudgetCategory">Category</th>
                                <th className = "tableHomeBudgetNumber">Spent</th>
                                <th className = "tableHomeBudgetNumber">Budget</th>
                                <th className = "tableHomeBudgetNumber">Balance</th>
                            </tr>
                        </thead>
                        <tbody className = "budgetBudgetDetailsBody">
                            <FlatList 
                                list={categories}
                                renderItem={renderCategories}
                                renderWhenEmpty={() => <tr><th><p>There is no expense yet!</p></th></tr>}
                            />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default PopUpBudgetDetails