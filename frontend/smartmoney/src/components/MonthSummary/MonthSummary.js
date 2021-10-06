import React from "react";
import Categories from "./Categories/Categories";
import "./style.css";
import {useState, useEffect} from 'react';
import { IoChevronBackSharp } from "@react-icons/all-files/io5/IoChevronBackSharp"; 
import { IoChevronForwardSharp } from "@react-icons/all-files/io5/IoChevronForwardSharp"; 
import { style } from "@mui/system";
import icons from "../../functions/icons";

import {
    Chart,
    ChartLegend,
    ChartSeries,
    ChartSeriesItem,
    ChartTitle,
    ChartSeriesLabels,
  } from "@progress/kendo-react-charts";

const colors = ["#141367","#5F1A37","#5E4474","#867A09","#18775C","#7775E6","#F7EC8D","#E59FBC",]
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const MonthSummary = ({openPopUpCategoryDetails, update}) => {

    const [date, setDate] = useState(new Date());
    const [updatte, setUpdate] = useState(new Date());
    const [categories, setCategories] = useState([]);
    const [chartCategories,setChartCategories] = useState([]);
    const [chartTotalValue,setChartTotalValue] = useState(0);
    const [chartSubTotalValue,setChartSubTotalValue] = useState(0);
    const [subTotalVisible,setSubTotalVisible] = useState(false);
    function fetchCategories(){
        const session = JSON.parse(localStorage.session);
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: session.code})
        };
        fetch('https://smart-money-back.herokuapp.com/categories/'+session.user_id+'/', requestOptions)
          .then(response => response.json())
          .then(data => {
              let categoriesSelected = [];
              let categoriesChart = [];
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
                    categoriesChart.push(category);
                    chartTotal = chartTotal + category.total
                  }else{
                    category.color = "#AAAAAA";
                  }
                  categoriesSelected.push(category);
                });
              setChartTotalValue(chartTotal);
              setChartSubTotalValue(chartTotal);
              setChartCategories(categoriesChart);
              setCategories(categoriesSelected);
              data.map( category => {})
              //#TODO: SACAR LAS SIGUIETNES 3 LINEAS, CAMBIAR POR RUTA CORRESPONDIENTE
              let allCategories = [];
              data.map( obj => {allCategories.push(obj.name)});
              localStorage.setItem('allCategories',allCategories);
            });
    }

    useEffect(() => fetchCategories(),[update])

    const changeSelectedCategories = (category, add) => {
        if(add){
            if(chartTotalValue===(chartSubTotalValue+ category.total))setSubTotalVisible(false);
            chartCategories.push(category);
            setChartSubTotalValue(chartSubTotalValue + category.total);
        }else{
            let index = chartCategories.findIndex(x => x ===category);
            chartCategories.splice(index,1);
            setChartSubTotalValue(chartSubTotalValue - category.total)
            setSubTotalVisible(true);
        }
    }

    const labelContent = category => icons(category.icon);

    return(
        <div className="cardContainer cardContainerMonthSummary">
            <div className="monthSummaryFirstDiv">
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'start'}}>
                    <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                        <IoChevronBackSharp onClick={()=>{date.setMonth(date.getMonth() - 1);setUpdate(!updatte)}}/>
                        <p className="monthYearText">{monthNames[date.getMonth()]}, {date.getFullYear()}</p>
                        <IoChevronForwardSharp onClick={()=>{date.setMonth(date.getMonth() + 1);setUpdate(!updatte)}}/>
                    </div>
                    <div>
                        {!subTotalVisible&&<p className="totalText">Total: ${chartTotalValue}</p>}
                        {subTotalVisible&&<p className="totalText" style={{color:'#BBBBBB'}}>Total: ${chartTotalValue}</p>}
                        {subTotalVisible&&<p className="subtotalText">SubTotal: ${chartSubTotalValue}</p>}
                    </div>
                </div>
                <div className="pieChartContainer">
                    <Chart style={{height:'100%'}}>
                        <ChartLegend visible={false} />
                        <ChartSeries height={500} width={500}>
                            <ChartSeriesItem
                                type="pie"
                                data={chartCategories}
                                field="total"
                                categoryField="name"
                                color= "color"
                                labels={{
                                visible: true,
                                content: "name",
                                }}
                            />
                            {/* <ChartSeriesLabels
                                color="#fff"
                                background="none"
                                content={labelContent}
                            /> */}
                        </ChartSeries>
                    </Chart>
                </div>


            </div>
            <div className="monthSummarySecondtDiv">
                <Categories categories={categories} changeSelectedCategories={changeSelectedCategories} openPopUpCategoryDetails={openPopUpCategoryDetails}/>
            </div>
        </div>
    )
}

export default MonthSummary;