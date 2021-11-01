import React from 'react';
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

const Filters = ({    
    resetFields,
    applyFilters,
    description,
    setDescription,
    categories,
    setCategories,
    minValue,
    setMinValue,
    maxValue,
    setMaxValue,
    fromDate,
    setFromDate,
    upToDate,
    setUpToDate}) => {

    const categoryList = localStorage.allCategories.split(',');

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

    return (
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
                        label = 'From'
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
                        label = 'Up to'
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
    )
}

export default Filters