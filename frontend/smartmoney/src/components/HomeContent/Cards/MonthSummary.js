import React from 'react';
import {useState, useEffect} from 'react';
import "./style.css";
import FlatList from 'flatlist-react';
import icons from "../../../functions/icons";
import { IoTrashOutline } from "@react-icons/all-files/io5/IoTrashOutline"; 
import { Pie } from 'react-chartjs-2';
import { dataFramePieChart } from '../../../constants/dataFramePieChart';

const MonthSummary = ({monthSummary,update, openPopUpSessionExpired}) => {

    const [chartCategories,setChartCategories] = useState(dataFramePieChart);
   
    function fetchCategories(){
        const session = JSON.parse(localStorage.session);
        const date = new Date();
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: session.code, month:date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()})
        };
        fetch('https://smart-money-back.herokuapp.com/categories/'+session.user_id+'/', requestOptions)
          .then(response => response.json())
          .then(data => {
              let categoriesChartName = [];
              let categoriesChartValue = [];
              data.map( category => {
                categoriesChartName.push(category.name);
                categoriesChartValue.push(category.total);
                });
              let dataFrame = {...dataFramePieChart};
              dataFrame.labels = categoriesChartName;
              dataFrame.datasets[0].data = categoriesChartValue;
              setChartCategories(dataFrame);

            })
            .catch(error => openPopUpSessionExpired())
    }

    useEffect(() => fetchCategories(),[update])

    return(
        <div className="cardContainer cardContainerHomeContent" onClick={monthSummary}>
            <div className="cardTitleContainer">
                <p className="cardTitle">Month summary</p>
            </div>
            <div style={{width:'90%', height:'65%', marginTop:60}}>
                <Pie options= {{maintainAspectRatio: false,plugins: {legend: {display: false}}}} data={chartCategories} />
            </div>
        </div>
    )
}

export default MonthSummary