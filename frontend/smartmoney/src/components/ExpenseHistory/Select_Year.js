import React from 'react';
import {useState, useEffect} from 'react';
import { IoChevronBackSharp } from "@react-icons/all-files/io5/IoChevronBackSharp"; 
import { IoChevronForwardSharp } from "@react-icons/all-files/io5/IoChevronForwardSharp"; 

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import TextField from '@mui/material/TextField';



const YearSelection = ({fromYear,upToDate,setFromDate,setUptoDate}) => {


	return(
		<div>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<DatePicker 
					views={['year', 'month']}
                    label = 'From'
                    value={fromYear}
                    maxDate={upToDate} 
                    onChange={(date) => setFromDate(date)} 
                    renderInput={(params) => 
                        <TextField margin = 'dense'
                        size = "small" {...params} 
                        />}/>
                <DatePicker 
					views={['year', 'month']}
                    label = 'Up to'
                    value={upToDate}
                    maxDate={new Date()}
                    onChange={(date) => setUptoDate(date)} 
                    renderInput={(params) => 
                        <TextField margin = 'dense'
                        size = "small" {...params} 
                        />}/>
            </LocalizationProvider>
        </div>
		)
}

export default YearSelection;