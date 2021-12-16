import React from "react";
import Categories from "./Categories/Categories";
import "./style.css";
import {useState, useEffect} from 'react';
import { IoChevronBackSharp } from "@react-icons/all-files/io5/IoChevronBackSharp"; 
import { IoChevronForwardSharp } from "@react-icons/all-files/io5/IoChevronForwardSharp"; 
import { Pie } from 'react-chartjs-2';
import { useMediaQuery } from 'react-responsive';
import { dataFramePieChart } from '../../constants/dataFramePieChart';
import { colors } from "../../constants/colors";
import { monthNames } from "../../constants/monthNames";

const MonthSummary = ({openPopUpCategoryDetails, update, openPopUpSessionExpired}) => {

  const isMobileDevice = useMediaQuery({
    query: "(max-device-width: 480px)",
  });


    const [date, setDate] = useState(new Date());
    const [updatte, setUpdate] = useState(new Date());
    const [categories, setCategories] = useState([]);
    const [chartCategories,setChartCategories] = useState(dataFramePieChart);
    const [chartTotalValue,setChartTotalValue] = useState(0);
    const [chartSubTotalValue,setChartSubTotalValue] = useState(0);
    const [subTotalVisible,setSubTotalVisible] = useState(false);
    function fetchCategories(){
        const session = JSON.parse(localStorage.session);
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: session.code, month: date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()})
        };
        fetch('https://smart-money-back.herokuapp.com/categories/'+session.user_id+'/', requestOptions)
          .then(response => {
            if(response.status===200){
                return response.json()
            }else if (response.status===401){
              openPopUpSessionExpired()
            }
          })
          .then(data => {
              let categoriesFetch = [];
              let categoriesChartName = [];
              let categoriesChartValue = [];
              let chartTotal = 0;
              let i = 0;
              data.map( category => {
                  category.isSelected = (category.total>0);
                  category.isDisabled = (category.total===0);
                  if(category.isSelected){
                    category.color = colors[i];
                    i++;
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
              let dataFrame = {...dataFramePieChart};
              dataFrame.labels = categoriesChartName;
              dataFrame.datasets[0].data = categoriesChartValue;
              setChartCategories(dataFrame);
              setCategories([]);
              setCategories(categoriesFetch);
            })
    }

    useEffect(() => fetchCategories(),[update,updatte])


    function getElementFromEvent(elem) {
      openPopUpCategoryDetails(categories[elem[0].index],date);
    }

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
                        <IoChevronForwardSharp onClick={()=>{if(date.setDate(2)<(new Date().setDate(1))){date.setMonth(date.getMonth() + 1);setUpdate(!updatte)}}}/>
                    </div>
                    <div>
                        {!subTotalVisible&&<p className="totalText">Total: ${chartTotalValue}</p>}
                        {subTotalVisible&&<p className="totalText" style={{color:'#BBBBBB'}}>Total: ${chartTotalValue}</p>}
                        {subTotalVisible&&<p className="subtotalText">SubTotal: ${chartSubTotalValue}</p>}
                    </div>
                </div>
                <div className="pieChartContainer">
                    <Pie 
                      options= {{maintainAspectRatio: false,plugins: {legend: {display: false}}}} 
                      data={chartCategories} 
                      getElementAtEvent={getElementFromEvent}/>
                </div>

            </div>
            <div className="monthSummarySecondtDiv">
                <Categories 
                  month= {date} 
                  categories={categories} 
                  changeSelectedCategories={changeSelectedCategories} 
                  openPopUpCategoryDetails={openPopUpCategoryDetails}/>
            </div>
        </div>
    )
}

export default MonthSummary;