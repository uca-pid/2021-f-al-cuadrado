import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {useState, useEffect} from 'react';




const BudgetExpenseSelector = ({getAll,getExpenses,getBudgets}) => {
	const [selection, setSelection] = React.useState(['Expenses','Budget']);

	const handleChange = (event, newSelection) => {
		if (JSON.stringify(newSelection) == JSON.stringify(['Budget'])) {
			getBudgets()
		} else if(JSON.stringify(newSelection) === JSON.stringify(['Expenses'])){
			getExpenses()
		}
		else{
			getAll()
		}
		setSelection(newSelection);
  };
return (
	<ToggleButtonGroup
      color="primary"
      value={selection}
      onChange={handleChange}>
      <ToggleButton style={((JSON.stringify(selection) == JSON.stringify(['Budget']))||(JSON.stringify(selection) == JSON.stringify([])))?{backgroundColor:'rgba(54, 162, 235, 0.2)'}:{backgroundColor:'rgba(54, 162, 235, 0.6)'}} value="Expenses">Expenses</ToggleButton>
      <ToggleButton style={((JSON.stringify(selection) == JSON.stringify(['Expenses']))||(JSON.stringify(selection) == JSON.stringify([])))?{backgroundColor:'rgba(153, 102, 255, 0.2)'}:{backgroundColor:'rgba(153, 102, 255, 0.6)'}} value="Budget">Budget</ToggleButton>
    </ToggleButtonGroup>
    )
}




export default BudgetExpenseSelector;
