import React from 'react';
import { Bar } from 'react-chartjs-2';
import {useState, useEffect} from 'react';

import Stack from '@mui/material/Stack';
import YearSelection from "./Select_Year.js"
import { dataFrameBarChart } from '../../constants/dataFrameBarChart';
import { monthsNamesShort } from '../../constants/monthsNamesShort';

const options = {
  maintainAspectRatio: false,
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
      //#TODO: Revisar que no se este salteando un mes, en ese caso agregarlo con valor 0
        let month_number = parseInt((monthTotal.month.slice(5,7)));
        let month_letter = monthsNamesShort[month_number-1];
        let year = monthTotal.month.slice(0,4);
        let total = monthTotal.total;
        dataFrameBarChart.datasets[0].data.push(total)
        dataFrameBarChart.labels.push(month_letter + ' ' + year)

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
            dataFrameBarChart.labels = []
            dataFrameBarChart.datasets[0].data = []
            data.forEach(month => month_totalProcess(month))
            setDataFrame({...dataFrameBarChart})
            //Math.min(...dataFrameBarChart.datasets[0].data)
    })
}
    useEffect(() => fetchTotals(),[fromDate,upToDate,update])

    return(
    <Stack 
    style={{height:350}}
    spacing={2}
    alignItems="center">
        <YearSelection 
        fromYear={fromDate}
        upToDate = {upToDate}
        setFromDate = {setFromDate}
        setUptoDate = {setUpToDate}/>
        <Bar 
        style={{height:300, width:'80%'}}
        getElementAtEvent={getElementFromEvent}
        data={dataFrame} options={options} />
      </Stack>

)};

export default BarChart;