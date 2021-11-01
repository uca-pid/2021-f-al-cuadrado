import React from 'react';
import {useState, useEffect} from 'react';
import "./style.css";
import FlatList from 'flatlist-react';
import icons from "../../../functions/icons";
import { IoTrashOutline } from "@react-icons/all-files/io5/IoTrashOutline"; 
import { Pie } from 'react-chartjs-2';
import { dataFramePieChart } from '../../../constants/dataFramePieChart';

const CurrentBudget = ({update}) => {

   const [categories, setCategories] = useState([]);
   const [budget, setBudget] = useState(0);
   const [spent, setSpent] = useState(0);
   const [diference, setDiference] = useState(0);
   const [green, setGreen] = useState(true);

    function fetchLoadScreen(){
        const date = new Date();
        const session = JSON.parse(localStorage.session);
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
            //   let categoriesChartName = [];
            //   let categoriesChartValue = [];
            //   data.map( category => {
            //     categoriesChartName.push(category.name);
            //     categoriesChartValue.push(category.total);
            //     });
            //   //let dataFrame = {...dataFramePieChart};
            //   dataFrame.labels = categoriesChartName;
            //   dataFrame.datasets[0].data = categoriesChartValue;
            //   setChartCategories(dataFrame);

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
        <div className="cardContainer cardContainerHomeContentBig">
            <div className="cardTitleContainer">
                <p className="cardTitle">Current budget</p>
            </div>
            <div style={{width:'90%', height:'85%', marginTop:20, }}>
                <div style={{width:'100%', height:'35%', display:'flex',flexDirection:'row', justifyContent:'space-around'}}>
                    <div style={{width:'30%'}}>
                        <p style={{margin:0, fontSize:12}}>Diference:</p>
                        <p style={green ? {fontSize:70, margin:0, textAlign:'center',color:'green'} : {fontSize:70, margin:0,width:'30%', textAlign:'center',color:'red'}}>{diference}</p>

                    </div>
                    <div style={{width:'30%'}}>
                        <p style={{margin:0, fontSize:12}}>Spent:</p>
                        <p style={{margin:0, fontSize:30}}>{spent}</p>
                        <p style={{margin:0, fontSize:12}}>Budget:</p>
                        <p style={{margin:0, fontSize:30}}>{budget}</p>
                    </div>
                </div>
                <table className = "categoriesHomeTable">
                    <thead className = "budgetHomeTableHead">
                        <tr className = "headCategoriesRow">
                            <th className = "tableHomeBudgetIcon"></th>
                            <th className = "tableHomeBudgetCategory">Category</th>
                            <th className = "tableHomeBudgetNumber">Spent</th>
                            <th className = "tableHomeBudgetNumber">Budget</th>
                            <th className = "tableHomeBudgetNumber">Total</th>
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
        </div>
    )
}

export default CurrentBudget