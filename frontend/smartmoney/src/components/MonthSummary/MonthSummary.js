import React from "react";
import Categories from "./Categories/Categories";
import "./style.css";
import {useState, useEffect} from 'react';
import { IoChevronBackSharp } from "@react-icons/all-files/io5/IoChevronBackSharp"; 
import { IoChevronForwardSharp } from "@react-icons/all-files/io5/IoChevronForwardSharp"; 
import { style } from "@mui/system";
import icons from "../../functions/icons";
import { Pie } from 'react-chartjs-2';
import { useMediaQuery } from 'react-responsive';

const colors = ['rgba(255, 99, 132, 1)',
'rgba(54, 162, 235, 1)',
'rgba(255, 206, 86, 1)',
'rgba(75, 192, 192, 1)',
'rgba(153, 102, 255, 1)',
'rgba(255, 159, 64, 1)']
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const dataFrameAux = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

const MonthSummary = ({openPopUpCategoryDetails, update}) => {

  const isMobileDevice = useMediaQuery({
    query: "(max-device-width: 480px)",
  });


    const [date, setDate] = useState(new Date());
    const [updatte, setUpdate] = useState(new Date());
    const [categories, setCategories] = useState([]);
    const [chartCategories,setChartCategories] = useState(dataFrameAux);
    const [chartTotalValue,setChartTotalValue] = useState(0);
    const [chartSubTotalValue,setChartSubTotalValue] = useState(0);
    const [subTotalVisible,setSubTotalVisible] = useState(false);
    function fetchCategories(){
        const session = JSON.parse(localStorage.session);
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: session.code, month:date.getMonth()+1})
        };
        fetch('https://smart-money-back.herokuapp.com/categories/'+session.user_id+'/', requestOptions)
          .then(response => response.json())
          .then(data => {
              let categoriesFetch = [];
              let categoriesChartName = [];
              let categoriesChartValue = [];
              let chartTotal = 0;
              //data.map( category => {chartTotal = chartTotal + category.total;})
              let i = 0;
              data.map( category => {
                  category.isSelected = (category.total>0);
                  category.isDisabled = (category.total===0);
                  if(category.isSelected){
                    category.color = colors[i];
                    i++;
                    console.log(category)
                    categoriesChartName.push(category.name);
                    categoriesChartValue.push(category.total);
                    chartTotal = chartTotal + category.total
                  }else{
                    category.color = "#AAAAAA";
                  }
                  categoriesFetch.push(category);
                });
              setChartTotalValue(chartTotal);
              setChartSubTotalValue(chartTotal);
              setSubTotalVisible(false);
              let dataFrame = {...dataFrameAux};
              dataFrame.labels = categoriesChartName;
              dataFrame.datasets[0].data = categoriesChartValue;
              setChartCategories(dataFrame);
              setCategories([]);
              setCategories(categoriesFetch);
            });
    }

    useEffect(() => fetchCategories(),[update,updatte])

    const changeSelectedCategories = (category, add) => {
        let index = chartCategories.labels.findIndex(x => x ===category.name);
        if(add){
            if(chartTotalValue===(chartSubTotalValue+ category.total))setSubTotalVisible(false);
            chartCategories.datasets[0].data[index]=category.total;

            setChartSubTotalValue(chartSubTotalValue + category.total);
            setChartCategories({...chartCategories});
        }else{
            chartCategories.datasets[0].data[index]=0;
            setChartSubTotalValue(chartSubTotalValue - category.total)
            setSubTotalVisible(true);
            setChartCategories({...chartCategories});
        }
    }

    return(
        <div className="cardContainer cardContainerMonthSummary">
            <div className="monthSummaryFirstDiv">
                <div style={isMobileDevice?{display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'start', height:120}:{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'start', height:120}}>
                    <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                        <IoChevronBackSharp onClick={()=>{date.setMonth(date.getMonth() - 1);setUpdate(!updatte)}}/>
                        <p className="monthYearText">{monthNames[date.getMonth()]}, {date.getFullYear()}</p>
                        <IoChevronForwardSharp onClick={()=>{if(date.getMonth()!==(new Date().getMonth())){date.setMonth(date.getMonth() + 1);setUpdate(!updatte)}}}/>
                    </div>
                    <div>
                        {!subTotalVisible&&<p className="totalText">Total: ${chartTotalValue}</p>}
                        {subTotalVisible&&<p className="totalText" style={{color:'#BBBBBB'}}>Total: ${chartTotalValue}</p>}
                        {subTotalVisible&&<p className="subtotalText">SubTotal: ${chartSubTotalValue}</p>}
                    </div>
                </div>
                <div className="pieChartContainer">
                    <Pie options= {{maintainAspectRatio: false,plugins: {legend: {display: false}}}} data={chartCategories} />
                </div>


            </div>
            <div className="monthSummarySecondtDiv">
                <Categories month= {date.getMonth() +1} categories={categories} changeSelectedCategories={changeSelectedCategories} openPopUpCategoryDetails={openPopUpCategoryDetails}/>
            </div>
        </div>
    )
}

export default MonthSummary;