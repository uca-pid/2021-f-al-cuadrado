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
import { useMediaQuery } from 'react-responsive';

const CurrentBudget = ({newBudget, update, openPopUpSessionExpired}) => {

   const [categories, setCategories] = useState([]);
   const [budget, setBudget] = useState(0);
   const [spent, setSpent] = useState(0);
   const [diference, setDiference] = useState(0);
   const [green, setGreen] = useState(true);
   const [display, setDisplay] = useState(false);
   const [budgetCurrentMonth, setBudgetCurrentMonth] = useState(false);

   const isMobileDevice = useMediaQuery({
    query: "(max-device-width: 480px)",
    });

    function fetchLoadScreen(){
        const date = new Date();
        const session = JSON.parse(localStorage.session);
        let activeBudget = false;

        const requestOptionsNewExpense = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({code: session.code})
          };
          console.log(requestOptionsNewExpense.body)
          fetch('https://smart-money-back.herokuapp.com/active_budget/'+session.user_id+'/', requestOptionsNewExpense)
            .then((response) => {
                console.log(response.status)
              if(response.status===200){
                  activeBudget = true;
                setBudgetCurrentMonth(true)
              }else if (response.status===400){
                setBudgetCurrentMonth(false)
              }else if (response.status===401){
                openPopUpSessionExpired()
              }
            })
            .then(()=>{
                if(activeBudget){
                    console.log(date.getFullYear()+'-'+(date.getMonth()+1)+'-'+1)
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                            code: session.code,
                            month: date.getFullYear()+'-'+(date.getMonth()+1)+'-'+1,
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
                            console.log(data)
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
                
                {(!display&&!isMobileDevice)&&<p className="cardTitle" style={{margin:0}}>Current budget</p>}
                {(display&&!isMobileDevice)&&
                    <div style={{marginTop:20}}>
                        <p className="cardTitle" style={{margin:0}}>Current budget</p>
                        <div style={{marginTop:20}}>
                            <p style={{margin:0, fontSize:12}}>Spent:</p>
                            <p className="homeBudgetValues" style={green ? {fontWeight:'bold',color:'green'} : {fontWeight:'bold',color:'red'}}>{diference} %</p>
                        </div>
                        <div style={{marginTop:20}}>
                            <p style={{margin:0, fontSize:12}}>Spent:</p>
                            <p className="homeBudgetValues">$ {spent}</p>
                        </div>
                        <div style={{marginTop:20}}>
                            <p style={{margin:0, fontSize:12}}>Budget:</p>
                            <p className="homeBudgetValues">$ {budget}</p>
                        </div>
                    </div>
                }
            </div>
            <div className="cardTitleContainer" style={{display:'flex', flex:2}}>
                {(!budgetCurrentMonth&&!isMobileDevice) && 
                    <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                        {isMobileDevice&&
                            <Button     
                                variant = 'contained'
                                type="button" 
                                className="button1"
                                type="button" 
                                onClick={newBudget}  
                                >
                                Create new budget
                            </Button> 
                        }
                        {!isMobileDevice&&
                            <Button     
                                variant = 'contained'
                                type="button" 
                                className="button1"
                                type="button" 
                                onClick={newBudget}  
                                >
                                Create a budget for current month!
                            </Button> 
                        }
                    </div>
                }
                {(!display && budgetCurrentMonth&&!isMobileDevice)&&
                 <div style={{width:'100%', display:'flex',flexDirection:'row', justifyContent:'space-around'}}>
                    <div style={{width:'30%'}}>
                        <p style={{margin:0, fontSize:12}}>Spent:</p>
                        <p className="homeBudgetValues" style={green ? {fontWeight:'bold',color:'green'} : {fontWeight:'bold',color:'red'}}>{diference} %</p>
                    </div>
                    <div style={{width:'30%'}}>
                        <p style={{margin:0, fontSize:12}}>Spent:</p>
                        <p className="homeBudgetValues">$ {spent}</p>
                    </div>
                    <div style={{width:'30%'}}>
                        <p style={{margin:0, fontSize:12}}>Budget:</p>
                        <p className="homeBudgetValues">$ {budget}</p>
                    </div>
                    <IoChevronDownSharp style={{width:30, height:30, alignSelf:'center'}} onClick={()=>setDisplay(true)}/>
                </div>
                }
                {(display&&!isMobileDevice)&&
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
            {isMobileDevice&&
                <div>
                    <div style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
                        <p className="cardTitle" style={{margin:0, width:'30%'}}>Current budget</p>
                        <div style={{marginTop:20}}>
                            <p style={{margin:0, fontSize:12}}>Spent:</p>
                            <p className="homeBudgetValues" style={green ? {fontWeight:'bold',color:'green'} : {fontWeight:'bold',width:'30%',color:'red'}}>{diference} %</p>
                        </div>
                        <div style={{marginTop:20}}>
                            <p style={{margin:0, fontSize:12}}>Spent:</p>
                            <p className="homeBudgetValues">$ {spent}</p>
                        </div>
                        <div style={{marginTop:20}}>
                            <p style={{margin:0, fontSize:12}}>Budget:</p>
                            <p className="homeBudgetValues">$ {budget}</p>
                        </div>
                        {!display &&<IoChevronDownSharp style={{width:30, height:30, alignSelf:'center'}} onClick={()=>setDisplay(true)}/>}
                        {display &&<IoChevronUpSharp style={{width:30, height:30, alignSelf:'center'}} onClick={()=>setDisplay(false)}/>}
                    </div>
                    {display&&

                    
                        <table className = "categoriesHomeTable">
                            <thead className = "budgetHomeTableHead">
                                <tr className = "headCategoriesRow">
                                    <th className = "tableHomeBudgetIcon"></th>
                                    <th className = "tableHomeBudgetCategory" style={{fontSize:10}}>Category</th>
                                    <th className = "tableHomeBudgetNumber"  style={{fontSize:10}}>Spent</th>
                                    <th className = "tableHomeBudgetNumber"  style={{fontSize:10}}>Budget</th>
                                    <th className = "tableHomeBudgetNumber"  style={{fontSize:10}}>Balance</th>
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
                    }
                </div>
            }
        </div>
    )
}

export default CurrentBudget