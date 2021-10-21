import React from 'react';
import {useState, useEffect} from 'react';
import "./style.css";
import FlatList from 'flatlist-react';
import icons from "../../../functions/icons";
import { IoTrashOutline } from "@react-icons/all-files/io5/IoTrashOutline"; 
import { Pie } from 'react-chartjs-2';
import { dataFramePieChart } from '../../../constants/dataFramePieChart';
import Button from '@mui/material/Button';
import { IoChevronDownSharp } from "@react-icons/all-files/io5/IoChevronDownSharp"; 
import { IoChevronUpSharp } from "@react-icons/all-files/io5/IoChevronUpSharp"; 

const CurrentBudget = ({newBudget, update}) => {

   const [categories, setCategories] = useState([]);
   const [budget, setBudget] = useState(0);
   const [spent, setSpent] = useState(0);
   const [diference, setDiference] = useState(0);
   const [green, setGreen] = useState(true);
   const [display, setDisplay] = useState(false);
   const [budgetCurrentMonth, setBudgetCurrentMonth] = useState(false);

    function fetchLoadScreen(){
        const date = new Date();
        const session = JSON.parse(localStorage.session);

        const requestOptionsNewExpense = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({code: session.code})
          };
          console.log(requestOptionsNewExpense.body)
          fetch('https://smart-money-back.herokuapp.com/active_budget/'+session.user_id+'/', requestOptionsNewExpense)
            .then((response) => {
              if(response.status===200){
                setBudgetCurrentMonth(true)
              }
            });  

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
                code: session.code,
                month: date.getFullYear()+'-'+(date.getMonth()+1)+'-'+1,
            })
        };
        fetch('https://smart-money-back.herokuapp.com/budget_details/'+session.user_id+'/', requestOptions)
          .then(response => response.json())
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
              if((totalBudget-totalSpent)>=0){
                setDiference(totalBudget-totalSpent);
              }else{
                setDiference(totalSpent-totalBudget);
              }
              setGreen((totalBudget-totalSpent)>=0);
            });
    }

    useEffect(() => fetchLoadScreen(),[update])

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
        <div className="cardContainer cardContainerHomeContentBig" style={display ? {height:370, marginBottom:0, flexDirection:'row', alignItems:'flex-start'} : {height:40, marginBottom:0, flexDirection:'row'}}>
            <div className="cardTitleContainer" style={{display:'flex', flex:1, alignItems:'center', flexDirection:'column'}}>
                {!display&&<p className="cardTitle" style={{margin:0}}>Current budget</p>}
                {display&&
                 <div style={{marginTop:20}}>
                    <p className="cardTitle" style={{margin:0}}>Current budget</p>
                    <div style={{marginTop:20}}>
                        <p style={{margin:0, fontSize:12}}>Balance:</p>
                        <p style={green ? {fontSize:35, margin:0, fontWeight:'bold',color:'green'} : {fontSize:25, margin:0, fontWeight:'bold',width:'30%',color:'red'}}>$ {diference}</p>
                    </div>
                    <div style={{marginTop:20}}>
                        <p style={{margin:0, fontSize:12}}>Spent:</p>
                        <p style={{margin:0, fontSize:25}}>$ {spent}</p>
                    </div>
                    <div style={{marginTop:20}}>
                        <p style={{margin:0, fontSize:12}}>Budget:</p>
                        <p style={{margin:0, fontSize:25}}>$ {budget}</p>
                    </div>
                </div>
                }
            </div>
            <div className="cardTitleContainer" style={{display:'flex', flex:2}}>
                {!budgetCurrentMonth && 
                    <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                        <Button     
                            variant = 'contained'
                            type="button" 
                            className="button1"
                            type="button" 
                            onClick={newBudget}  
                            >
                            Create a budget for current month!
                            </Button> 
                    </div>
                }
                {(!display && budgetCurrentMonth)&&
                 <div style={{width:'100%', display:'flex',flexDirection:'row', justifyContent:'space-around'}}>
                    <div style={{width:'30%'}}>
                        <p style={{margin:0, fontSize:12}}>Balance:</p>
                        <p style={green ? {fontSize:25, margin:0, fontWeight:'bold',color:'green'} : {fontSize:25, margin:0, fontWeight:'bold',width:'30%',color:'red'}}>$ {diference}</p>
                    </div>
                    <div style={{width:'30%'}}>
                        <p style={{margin:0, fontSize:12}}>Spent:</p>
                        <p style={{margin:0, fontSize:25}}>$ {spent}</p>
                    </div>
                    <div style={{width:'30%'}}>
                        <p style={{margin:0, fontSize:12}}>Budget:</p>
                        <p style={{margin:0, fontSize:25}}>$ {budget}</p>
                    </div>
                    <IoChevronDownSharp style={{width:30, height:30, alignSelf:'center'}} onClick={()=>setDisplay(true)}/>
                </div>
                }
                {display&&
                    <div style={{width:'90%', height:'85%', marginTop:15 }}>
                        <IoChevronUpSharp style={{position:'absolute',right:90,width:30, height:30, alignSelf:'center'}} onClick={()=>setDisplay(false)}/>
                        <table className = "categoriesHomeTable" style={{marginTop:30}}>
                            <thead className = "budgetHomeTableHead">
                                <tr className = "headCategoriesRow">
                                    <th className = "tableHomeBudgetIcon"></th>
                                    <th className = "tableHomeBudgetCategory">Category</th>
                                    <th className = "tableHomeBudgetNumber">Spent</th>
                                    <th className = "tableHomeBudgetNumber">Budget</th>
                                    <th className = "tableHomeBudgetNumber">Balance</th>
                                </tr>
                            </thead>
                            <tbody className = "budgetHomeTableBody">
                                <FlatList 
                                    list={categories}
                                    renderItem={renderCategories}
                                    renderWhenEmpty={() => <tr><th><p>There is no expense yet!</p></th></tr>}
                                />
                            </tbody>
                        </table>
                    </div>
                }
            </div>
            
        </div>
    )
}

export default CurrentBudget