import React from 'react';
import {useState, useEffect} from 'react';
import "./style.css";
import webStyles from "../webStyles";
import mobilStyles from "../mobilStyles";
import { useMediaQuery } from 'react-responsive';
import FlatList from 'flatlist-react';

const Espenses = () => {

    const isMobileDevice = useMediaQuery({
        query: "(max-device-width: 480px)",
    });

    const [nuevoConsumo, setNuevoConsumo] = useState('');
    const [newExpenseOnlyNumbers, setNewExpenseOnlyNumbers] = useState(false);
    const [consumos, setConsumos] = useState([]);

    function setExpenses(){
        const session = JSON.parse(localStorage.session);
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: session.code})
        };
        fetch('https://smart-money-back.herokuapp.com/expenses/'+session.user_id+'/', requestOptions)
          .then(response => response.json())
          .then(data => setConsumos(data));
    }
    
    useEffect(() => setExpenses())
    
    function agregarConsumo() {
        const onlyNumbers = /^[0-9]*$/;
        if(onlyNumbers.test(nuevoConsumo)){
          const session = JSON.parse(localStorage.session);
          const requestOptionsNewExpense = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: session.code, value: nuevoConsumo})
          };
          fetch('https://smart-money-back.herokuapp.com/new_expense/'+session.user_id+'/', requestOptionsNewExpense)
            .then((response) => {
              if(response.status===201){
                setNuevoConsumo('');
                const requestOptionsExpenses = {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ code: session.code})
                };
                fetch('https://smart-money-back.herokuapp.com/expenses/'+session.user_id+'/', requestOptionsExpenses)
                  .then(response => response.json())
                  .then(data => setConsumos(data));
              }
            });
        }else{
          setNewExpenseOnlyNumbers(true)
        }   
    }
    
    const renderConsumos = (item, index)=> {
        return (
          <tr className = "expensesRow">
            <th className = "expensesValue">$ {item.value}</th>       
          </tr>        
        )  
    }

    return(
        <div>
            <div className = "agregarConsumoContainer">
                <div>
                    <input style={isMobileDevice ? mobilStyles.input : webStyles.input} type="text" value={nuevoConsumo} onChange={e => setNuevoConsumo(e.target.value)} onFocus={()=>setNewExpenseOnlyNumbers(false)}/>
                    {newExpenseOnlyNumbers&&<p className = "invalidCredentials">Sólo números</p>}
                </div>
                <input 
                    className="buttonAgregarConsumo"
                    type="button" 
                    onClick={agregarConsumo} 
                    value="Agregar consumo" 
                    disabled={nuevoConsumo===''}/>
            </div>
            <div className = "expensesContainer">
                <table className = "expensesTable">
                    <FlatList 
                        list={consumos}
                        renderItem={renderConsumos}
                        renderWhenEmpty={() => <div>Todavía no se regitró ningún gasto!</div>}
                        sort={{by:"id"}}
                    />
                </table>
            </div>
        </div>
    )
}

export default Espenses;