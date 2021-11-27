import React from 'react';
import { Bar } from 'react-chartjs-2';
import {useState, useEffect} from 'react';

import Stack from '@mui/material/Stack';
import YearSelection from "./Select_Year.js"
import BudgetExpenseSelector from "./BudgetExpenseSelector.js"
import { dataFrameBarChart, dataFrameBarChartBudget , dataFrameBarChartExpenses} from '../../constants/dataFrameBarChart';
import { monthsNamesShort } from '../../constants/monthsNamesShort';
import { useMediaQuery } from 'react-responsive';
import PopUpBudgetDetails from '../home/PopUpBudgetDetails'

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

const BarChart = ({openPopUpCategories,openPopUpBudgetDetails,update,openPopUpSessionExpired}) => {
    const [fromDate, setFromDate] = useState(new Date(new Date().getFullYear(), 0, 1));
    const [upToDate, setUpToDate] = useState(new Date());
    const [dataFrame,setDataFrame] = useState([]);
    const [onlyBudgets,setOnlyBudgets] = useState(false);
    const [popUpBudgetDetails,setPopUpBudgetDetails] = useState(false);
    const [datePopUpBudgetDetails, setDatePopUpBudgetDetails] = useState(null)



    const isMobileDevice = useMediaQuery({
      query: "(max-device-width: 480px)",
      });

    function month_totalProcess(monthTotal,dataFrameBarChart) {

        let index = ((( monthTotal.month.split('-')[0]-fromDate.getFullYear())*12)+ parseInt(monthTotal.month.split('-')[1])) - fromDate.getMonth()-1;

        let total = monthTotal.total;
        dataFrameBarChart.datasets[0].data[index]=(total)

    }

    function getElementFromEvent(elem) {
      let month = fromDate.getMonth()
      if (elem[0] && elem[0].datasetIndex === 0 && !onlyBudgets) 
        {
          openPopUpCategories(dataFrame.labels[elem[0].index].split(" ")[1]+"-"+(((month+elem[0].index)%12)+1)+"-1")
        }
      else if(elem[0] && elem[0].datasetIndex === 1)
        {
          let dateAux = new Date(new Date().setMonth((month+(elem[0].index))%12))
          openPopUpBudgetDetails(dateAux)
          //setDatePopUpBudgetDetails(dateAux)
          //setPopUpBudgetDetails(true)
        }
      else if(elem[0] && elem[0].datasetIndex === 0 && onlyBudgets)
        {
          let dateAux = new Date(new Date().setMonth((month+(elem[0].index))%12))
          
          openPopUpBudgetDetails(dateAux)
          /*
          setDatePopUpBudgetDetails(dateAux)
          setPopUpBudgetDetails(true)*/
        }


    }

    function expenseTotals(dataFrameBarChart) {
      const fromDateNumber = fromDate.getMonth()+1;
      const upToDateNumber = upToDate.getMonth()+1;
      let number = (upToDateNumber-fromDateNumber)+1+12*(upToDate.getYear()-fromDate.getYear());
      const session = JSON.parse(localStorage.session);
      let requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            { 
                code: session.code,
                last_months: number,
            })
        };
        fetch('https://smart-money-back.herokuapp.com/expenses_per_month/'+session.user_id+'/', requestOptions)
          .then(response =>response.json())
          .then(data => {
            dataFrameBarChart.datasets[0].data = []
            data.forEach(month => month_totalProcess(month,dataFrameBarChart))
            //Math.min(...dataFrameBarChart.datasets[0].data)
            setDataFrame({...dataFrameBarChart})
          })
          .catch(error => openPopUpSessionExpired())

    }
    function fetchBudgets(dataFrameBarChart,dataset_index) {
      const offset = fromDate.getTimezoneOffset()
      const session = JSON.parse(localStorage.session);
      let up_to_date = new Date(upToDate - (offset*60*1000)).toISOString().split('T')[0]
      let from_date = new Date(fromDate - (offset*60*1000)).toISOString().split('T')[0]

      let requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            { 
                code: session.code,
                from_date: from_date,
                up_to_date: up_to_date
            })
        };
        fetch('https://smart-money-back.herokuapp.com/past_budgets/'+session.user_id+'/', requestOptions)
        .then(response => response.json())
        .then(data => {
          dataFrameBarChart.datasets[dataset_index].data = []
          data.forEach(month => {
            let month_date = new Date(month.budget__month)
            let month_number = month_date.getMonth() + 1
            let index
            if (month_date.getFullYear() != fromDate.getFullYear()) {
              index = month_date.getMonth() + (13 - fromDate.getMonth())
            } else {
              index = month_number - fromDate.getMonth()
            }
            dataFrameBarChart.datasets[dataset_index].data[index] = (month.total_budget)
          });
          setDataFrame({...dataFrameBarChart})
        })
        .catch(error => openPopUpSessionExpired())

    }
    function loadLabels(dataFrameBarChart) {
      dataFrameBarChart.labels = []
      let index_date = new Date(fromDate)
      while(index_date < upToDate){
        let month_number = index_date.getMonth()
        let month_letter = monthsNamesShort[month_number];
        let year = index_date.getFullYear().toString()
        dataFrameBarChart.labels.push(month_letter + ' ' + year)
        index_date = new Date(index_date.setMonth(index_date.getMonth()+1));
      }
      
    }
    function fetchAll(){
        setOnlyBudgets(false)
        dataFrameBarChart.datasets[1].data = []
        dataFrameBarChart.datasets[0].data = []
        dataFrameBarChart.labels = []
        expenseTotals(dataFrameBarChart)
        fetchBudgets(dataFrameBarChart,1)
        loadLabels(dataFrameBarChart)
        setDataFrame({...dataFrameBarChart})

}
    function fetchOnlyBudgets() {
        setOnlyBudgets(true)
        dataFrameBarChart.datasets[1].data = []
        dataFrameBarChartBudget.datasets[0].data = []
        dataFrameBarChartBudget.labels = []
        fetchBudgets(dataFrameBarChartBudget,0)
        loadLabels(dataFrameBarChartBudget)
}
    function fetchOnlyExpenses() {
        setOnlyBudgets(false)
        dataFrameBarChart.datasets[1].data = []
        dataFrameBarChartExpenses.datasets[0].data = []
        dataFrameBarChartExpenses.labels = []
        expenseTotals(dataFrameBarChartExpenses)
        loadLabels(dataFrameBarChartExpenses)
}

    useEffect(() => fetchAll(),[fromDate,upToDate,update])

    return(
    <Stack 
    style={{height:350}}
    spacing={2}
    alignItems="center">
    {//popUpBudgetDetails && <PopUpBudgetDetails closePopUp= {() => setPopUpBudgetDetails(false)} month={popUpBudgetDetailsMonth} openPopUpSessionExpired={openPopUpSessionExpired}/>}
  }
      {!isMobileDevice &&
        <div style={{display:'flex', flexDirection:'row', width:'100%',justifyContent:'space-around'}}>
            <YearSelection 
            fromYear={fromDate}
            upToDate = {upToDate}
            setFromDate = {setFromDate}
            setUptoDate = {setUpToDate}/>

            <BudgetExpenseSelector
            getAll = {fetchAll}
            getExpenses = {fetchOnlyExpenses}
            getBudgets = {fetchOnlyBudgets}
            />
          </div>
      }
      {isMobileDevice &&
        <div style={{display:'flex', flexDirection:'column', width:'100%',alignItems:'center'}}>
            <YearSelection 
            fromYear={fromDate}
            upToDate = {upToDate}
            setFromDate = {setFromDate}
            setUptoDate = {setUpToDate}/>

            <BudgetExpenseSelector
            getAll = {fetchAll}
            getExpenses = {fetchOnlyExpenses}
            getBudgets = {fetchOnlyBudgets}
            />
          </div>
      }

        <Bar 
        style={{height:300, width:'80%'}}
        getElementAtEvent={getElementFromEvent}
        data={dataFrame} options={options} />
      </Stack>

)};

export default BarChart;