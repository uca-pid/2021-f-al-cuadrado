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
      <ToggleButton value="Expenses">Expenses</ToggleButton>
      <ToggleButton value="Budget">Budget</ToggleButton>
    </ToggleButtonGroup>
    )
}




export default BudgetExpenseSelector;
