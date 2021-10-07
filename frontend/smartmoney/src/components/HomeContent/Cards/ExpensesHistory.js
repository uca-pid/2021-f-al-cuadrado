import React from 'react';
import {useState, useEffect} from 'react';
import "./style.css";
import FlatList from 'flatlist-react';
import icons from "../../../functions/icons";
import { IoTrashOutline } from "@react-icons/all-files/io5/IoTrashOutline"; 
import { Bar } from 'react-chartjs-2';


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

const ExpensesHistory = ({expenseHistory,update}) => {

    const [dataFrame,setDataFrame] = useState([])

    function month_totalProcess(monthTotal) {
        let month_number = parseInt((monthTotal.month.slice(5,7)));
        let month_letter = months[month_number-1];
        let year = monthTotal.month.slice(0,4);
        let total = monthTotal.total;
        dataFrameAux.datasets[0].data.push(total)
        dataFrameAux.labels.push(month_letter + ' ' + year)

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