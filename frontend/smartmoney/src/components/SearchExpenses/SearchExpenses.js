import React from "react";
import {useState,useEffect} from 'react';
import "./style.css";
import Expenses from "./Expenses/Expenses";
import TextField from '@mui/material/TextField';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Button from '@mui/material/Button';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        maxWidth: 30
      },
    },
  };

 
const SearchExpenses = ({openPopUpEditExpense, openPopUpDeleteExpense, update}) => {

    const categoryList = localStorage.allCategories.split(',');

    const [expenses, setExpenses] = useState([]);
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState(['Categories']);
    const [minValue, setMinValue] = useState('');
    const [maxValue, setMaxValue] = useState('');
    const [fromDate, setFromDate] = useState(null);
    const [upToDate, setUpToDate] = useState(null);

    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        if(value[0]==='Categories')value.splice(0,1)
        console.log(value)
        setCategories(
          // On autofill we get a the stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };
    
      const resetFields = () => {
          setDescription('');
          setCategories(['Categories']);
          setMinValue('');
          setMaxValue('');
          setFromDate(null);
          setUpToDate(null);
          const session = JSON.parse(localStorage.session);
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                  code: session.code,
                  from_date: null,
                  upTo_date: null,
                  description: '',
                  category: [],
                  valueFrom:null,
                  upToValue:null,
              })
          };
          
          fetch('https://smart-money-back.herokuapp.com/expenses/'+session.user_id+'/', requestOptions)
            .then(response => response.json())
            .then(data => {console.log(data);setExpenses({...data})});
      }
      const applyFilters = () => {
        fetchExpenses()
      }

      function fetchExpenses(){
        let fetchCategories = categories;
        if(fetchCategories[0]=='Categories')fetchCategories=[];
        const session = JSON.parse(localStorage.session);
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
                code: session.code,
                from_date: fromDate,
                upTo_date: upToDate,
                description: description,
                category: fetchCategories,
                valueFrom:minValue,
                upToValue:maxValue,
            })
        };
        
        fetch('https://smart-money-back.herokuapp.com/expenses/'+session.user_id+'/', requestOptions)
          .then(response => response.json())
          .then(data => {setExpenses({...data})});

    }
    useEffect(() => fetchExpenses(),[update])

    return(
        <div style={{display:'flex', flexDirection:'row'}}>
            <div className="searchExpensesFirstDiv">
                <Expenses expenses={expenses} openPopUpEditExpense={openPopUpEditExpense}  openPopUpDeleteExpense={openPopUpDeleteExpense} update ={update}/>

            </div>
            <div className="searchExpensesSecondtDiv">
                <div className="cardContainer">
                    <div className="cardTitleContainer">
                        <p className="cardTitle">Aply filters</p>
                    </div>
                    <div style={{display:'flex', flexDirection:'column', width:'100%', marginTop:15, alignItems:'center'}}>
                        <TextField
                            style={{width:'90%'}}
                            inputProps={{ "data-testid": "user-input" }}
                            label = "Description" variant = 'outlined' 
                            margin="dense"
                            type="text" value={description} 
                            onChange={e => setDescription(e.target.value)} 
                            size = 'small'
                            />
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            
                            value={categories}
                            onChange={handleChange}
                            input={<OutlinedInput label="Categories" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                            style = {{width:'90%',maxWidth:238}}
                            size = 'small'
                            margin="dense"
                            >
                            {categoryList.map((category) => (
                                <MenuItem key={category} value={category} >
                                <Checkbox checked={categories.indexOf(category) > -1} />
                                <ListItemText primary={category} />
                                </MenuItem>
                            ))}
                        </Select>
                        <TextField
                            style={{width:'90%'}}
                            inputProps={{ "data-testid": "user-input" }}
                            label = "Min value" variant = 'outlined' 
                            margin="dense"
                            type="text" value={minValue} 
                            onChange={e => setMinValue(e.target.value)} 
                            size = 'small'
                            />
                        <TextField
                            style={{width:'90%'}}
                            inputProps={{ "data-testid": "user-input" }}
                            label = "Max value" variant = 'outlined' 
                            margin="dense"
                            type="text" value={maxValue} 
                            onChange={e => setMaxValue(e.target.value)} 
                            size = 'small'
                            />
                        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:'90%'}}>
                            <LocalizationProvider dateAdapter={AdapterDateFns} >
                                <DatePicker 
                                    label = 'Date'
                                    value={fromDate} 
                                    onChange={(date) => setFromDate(date)} 
                                    error = {true}
                                    renderInput={(params) => 
                                        <TextField 
                                            margin = 'dense'
                                            size = "small" {...params} 
                                            style={{width:'45%'}}/>} 
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDateFns} >
                                <DatePicker 
                                    label = 'Date'
                                    value={upToDate} 
                                    onChange={(date) => setUpToDate(date)} 
                                    error = {true}
                                    renderInput={(params) => 
                                        <TextField 
                                            margin = 'dense'
                                            size = "small" {...params} 
                                            style={{width:'45%'}}/>} 
                                />
                            </LocalizationProvider>
                        </div>
                        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:'95%', marginTop:20}}>
                            <Button
                                style={{width: '49%'}}
                                variant="outlined"
                                onClick={resetFields} > 
                                Reset
                            </Button>
                            
                            <Button 
                                data-testid="login-button"
                                style={{width: '49%'}}
                                variant = "contained"
                                onClick={applyFilters} 
                                >
                                Apply
                            </Button>
                        </div>
                        

                    </div>

                </div>
            </div>
        </div>
    )
}

export default SearchExpenses;