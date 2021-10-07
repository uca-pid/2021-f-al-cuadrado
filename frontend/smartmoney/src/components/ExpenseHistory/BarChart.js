import React from 'react';
import { Bar } from 'react-chartjs-2';
import {useState, useEffect} from 'react';

import Stack from '@mui/material/Stack';
import YearSelection from "./Select_Year.js"

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

 let dataFrameAux = {
  labels: [],
  datasets: [
    {
      label: 'Amount expended',
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
}

const options = {
  indexAxis: 'x',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
        position: 'right',
        display: false,
    },
    title: {
      display: true,
      text: 'Monthly Chart',
    },
  },
};

const BarChart = ({openPopUpCategories,update}) => {
    const [fromDate, setFromDate] = useState(new Date(new Date().getFullYear(), 0, 1));
    const [upToDate, setUpToDate] = useState(new Date());
    const [dataFrame,setDataFrame] = useState([])

    function month_totalProcess(monthTotal) {
        let month_number = parseInt((monthTotal.month.slice(5,7)));
        let month_letter = months[month_number-1];
        let year = monthTotal.month.slice(0,4);
        let total = monthTotal.total;
        dataFrameAux.datasets[0].data.push(total)
        dataFrameAux.labels.push(month_letter + ' ' + year)

    }

    function getElementFromEvent(elem) {
      let month = fromDate.getMonth()
      if (elem[0]) 
        {
          openPopUpCategories((elem[0].index)+1+month)
        }
    }

    function fetchTotals(){
        const fromDateNumber = fromDate.getMonth()+1;
        const upToDateNumber = upToDate.getMonth()+1;
        let number = (upToDateNumber-fromDateNumber)+1+12*(upToDate.getYear()-fromDate.getYear());
        const session = JSON.parse(localStorage.session);
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            { 
                code: session.code,
                last_months: number,
            })
        };
        fetch('https://smart-money-back.herokuapp.com/expenses_per_month/'+session.user_id+'/', requestOptions)
          .then(response => response.json())
          .then(data => {
            dataFrameAux.labels = []
            dataFrameAux.datasets[0].data = []
            data.forEach(month => month_totalProcess(month))
            setDataFrame({...dataFrameAux})
            //Math.min(...dataFrameAux.datasets[0].data)
    })
}
    useEffect(() => fetchTotals(),[fromDate,upToDate,update])

    return(
    <Stack 
    spacing={2}
    alignItems="center">
        <YearSelection 
        fromYear={fromDate}
        upToDate = {upToDate}
        setFromDate = {setFromDate}
        setUptoDate = {setUpToDate}/>
        <Bar 
        getElementAtEvent={getElementFromEvent}
        data={dataFrame} options={options} />
      </Stack>

)};

export default BarChart;