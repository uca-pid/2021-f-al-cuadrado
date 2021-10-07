import React from 'react';
import {useState, useEffect} from 'react';
import "./style.css";
import FlatList from 'flatlist-react';
import icons from "../../../functions/icons";
import { IoTrashOutline } from "@react-icons/all-files/io5/IoTrashOutline"; 
import { Pie } from 'react-chartjs-2';

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

const MonthSummary = ({monthSummary,update}) => {

    const [chartCategories,setChartCategories] = useState(dataFrameAux);
   
    function fetchCategories(){
        const session = JSON.parse(localStorage.session);
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: session.code, month:new Date().getMonth()+1})
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
              let dataFrame = {...dataFrameAux};
              dataFrame.labels = categoriesChartName;
              dataFrame.datasets[0].data = categoriesChartValue;
              setChartCategories(dataFrame);

            });
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