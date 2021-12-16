import React from 'react';
import {useState, useEffect} from 'react';
import "./style.css";
import FlatList from 'flatlist-react';
import icons from "../../../functions/icons";
import { IoTrashOutline } from "@react-icons/all-files/io5/IoTrashOutline"; 
import { Bar } from 'react-chartjs-2';
import { dataFrameBarChartExpenses } from '../../../constants/dataFrameBarChart';
import { monthsNamesShort } from '../../../constants/monthsNamesShort';


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
  },
};

const ExpensesHistory = ({expenseHistory,update, openPopUpSessionExpired}) => {

    const [dataFrame,setDataFrame] = useState([])

    function month_totalProcess(monthTotal) {
        let month_number = parseInt((monthTotal.month.slice(5,7)));
        let month_letter = monthsNamesShort[month_number-1];
        let year = monthTotal.month.slice(0,4);
        let total = monthTotal.total;
        dataFrameBarChartExpenses.datasets[0].data.push(total)
        dataFrameBarChartExpenses.labels.push(month_letter + ' ' + year)

    }

    function fetchTotals(){
        const fromDateNumber = new Date().getMonth()+2;
        const upToDateNumber = new Date().getMonth()+1;
        let number = (upToDateNumber-fromDateNumber)+1+12*(0);
        const session = JSON.parse(localStorage.session);
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            { 
                code: session.code,
                last_months: 4,
            })
        };
        fetch('https://smart-money-back.herokuapp.com/expenses_per_month/'+session.user_id+'/', requestOptions)
          .then(response => {
            if(response.status===200){
                return response.json()
            }else if (response.status===401){
              openPopUpSessionExpired()
            }
          })
          .then(data => {
            dataFrameBarChartExpenses.labels = []
            dataFrameBarChartExpenses.datasets[0].data = []
            data.forEach(month => month_totalProcess(month))
            setDataFrame({...dataFrameBarChartExpenses})
            //Math.min(...dataFrameBarChartExpenses.datasets[0].data)
          })
}
    useEffect(() => fetchTotals(),[update])
   
    return(
        <div className="cardContainer cardContainerHomeContent" onClick={expenseHistory}>
            <div className="cardTitleContainer">
                <p className="cardTitle">Expense history</p>
            </div>
            <div style={{width:'90%', height:'65%', marginTop:60}}>
                <Bar 
                    style={{height:300, width:'80%'}}
                    data={dataFrame} options={options} />
            </div>
        </div>
    )
}

export default ExpensesHistory