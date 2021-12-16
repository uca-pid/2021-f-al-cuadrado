import React from "react";
import {useState,useEffect} from 'react';
import "./style.css";
import Expenses from "./Expenses/Expenses";

import { useMediaQuery } from 'react-responsive';

import { IoChevronDownSharp } from "@react-icons/all-files/io5/IoChevronDownSharp"; 
import { IoChevronUpSharp } from "@react-icons/all-files/io5/IoChevronUpSharp"; 
import Filters from "./Filers";

const SearchExpenses = ({openPopUpEditExpense, openPopUpDeleteExpense, update, openPopUpSessionExpired}) => {

    const isMobileDevice = useMediaQuery({
        query: "(max-device-width: 480px)",
      });

    const [expenses, setExpenses] = useState([]);
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState(['Categories']);
    const [minValue, setMinValue] = useState('');
    const [maxValue, setMaxValue] = useState('');
    const [fromDate, setFromDate] = useState(null);
    const [upToDate, setUpToDate] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [morePages, setMorePages] = useState(true);
    const [fromItem, setFromItem] = useState(50);

    const [mobileFilterDisplay, setMobileFilterDisplay]= useState(false);
    
      const resetFields = () => {
          setDescription('');
          setCategories(['Categories']);
          setMinValue('');
          setMaxValue('');
          setFromDate(null);
          setUpToDate(null);
          setFromItem(0)
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
                  from_item:0,
                  up_to_item:50,
              })
          };
          
          fetch('https://smart-money-back.herokuapp.com/expenses/'+session.user_id+'/', requestOptions)
            .then(response => {
                if(response.status===200){
                    return response.json()
                }else if (response.status===401){
                openPopUpSessionExpired()
                }
            })
            .then(data => {setMobileFilterDisplay(false);setMorePages(data.flag);setFromItem(50);setExpenses(data.data)})
      }
      const applyFilters = () => {
        fetchExpenses()
        setMobileFilterDisplay(false)
      }

      function fetchExpenses(){
        let from_date = null;
        let upTo_date = null;
        let fetchCategories = categories;
        if(fromDate)from_date=fromDate.getFullYear()+'-'+(fromDate.getMonth()+1)+'-'+(fromDate.getDate());
        if(upToDate)upTo_date=upToDate.getFullYear()+'-'+(upToDate.getMonth()+1)+'-'+(upToDate.getDate());
        if(fetchCategories[0]=='Categories')fetchCategories=[];
        const session = JSON.parse(localStorage.session);
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
                code: session.code,
                from_date: from_date,
                upTo_date: upTo_date,
                description: description,
                category: fetchCategories,
                valueFrom:minValue,
                upToValue:maxValue,
                from_item:0,
                up_to_item:50,
            })
        };
        
        fetch('https://smart-money-back.herokuapp.com/expenses/'+session.user_id+'/', requestOptions)
            .then(response => {
                if(response.status===200){
                    return response.json()
                }else if (response.status===401){
                openPopUpSessionExpired()
                }
            })
            .then(data => {
                setExpenses(data.data);
                setMorePages(data.flag);
                if(data.data.length===0)setErrorMessage("There is no expense yet!")
            })

    }
    useEffect(() => fetchExpenses(),[update])

    const loadMore = () => {
        let from_date = null;
        let upTo_date = null;
        let fetchCategories = categories;
        if(fromDate)from_date=fromDate.getFullYear()+'-'+(fromDate.getMonth()+1)+'-'+(fromDate.getDate()+1);
        if(upToDate)upTo_date=upToDate.getFullYear()+'-'+(upToDate.getMonth()+1)+'-'+(upToDate.getDate()+1);
        if(fetchCategories[0]=='Categories')fetchCategories=[];
        const session = JSON.parse(localStorage.session);
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
                code: session.code,
                from_date: from_date,
                upTo_date: upTo_date,
                description: description,
                category: fetchCategories,
                valueFrom:minValue,
                upToValue:maxValue,
                from_item:fromItem+50,
                up_to_item:fromItem+100,
            })
        };
        
        fetch('https://smart-money-back.herokuapp.com/expenses/'+session.user_id+'/', requestOptions)
            .then(response => {
                if(response.status===200){
                    return response.json()
                }else if (response.status===401){
                openPopUpSessionExpired()
                }
            })
            .then(data => {
                data.data.map((exp) => {console.log(exp)})
                    expenses.push(...data.data)
                    console.log(expenses)
                setMorePages(data.flag);
                setFromItem(fromItem+50);
                if(data.data.length===0)setErrorMessage("There is no expense yet!")
            })
    }

    return(
        <div className="searchExpensesContainer" >
            {isMobileDevice&&
            <div className="searchExpensesSecondtDiv">
                <div className="cardContainer">
                    <div className="cardTitleContainer" style={{marginBottom:10}}>
                        <p className="cardTitle">Apply filters</p>
                        {mobileFilterDisplay && <IoChevronUpSharp style={{marginRight:15}} onClick={()=>setMobileFilterDisplay(false)}/>}
                        {!mobileFilterDisplay && <IoChevronDownSharp style={{marginRight:15}} onClick={()=>setMobileFilterDisplay(true)}/>}
                    </div>
                    {mobileFilterDisplay &&
                        <Filters 
                            resetFields={resetFields}
                            applyFilters={applyFilters}
                            description={description}
                            setDescription={setDescription}
                            categories={categories}
                            setCategories={setCategories}
                            minValue={minValue}
                            setMinValue={setMinValue}
                            maxValue={maxValue}
                            setMaxValue={setMaxValue}
                            fromDate={fromDate}
                            setFromDate={setFromDate}
                            upToDate={upToDate}
                            setUpToDate={setUpToDate}
                        />
                    }
                </div>
            </div>
            }
            <div className="searchExpensesFirstDiv">
                <Expenses expenses={expenses} morePagesProps={morePages} loadMore={loadMore} errorMessage={errorMessage} openPopUpEditExpense={openPopUpEditExpense}  openPopUpDeleteExpense={openPopUpDeleteExpense} update ={update}/>

            </div>
            {!isMobileDevice&&
            <div className="searchExpensesSecondtDiv">
                <div className="cardContainer">
                    <div className="cardTitleContainer">
                        <p className="cardTitle">Apply filters</p>
                    </div>

                    <Filters 
                            resetFields={resetFields}
                            applyFilters={applyFilters}
                            description={description}
                            setDescription={setDescription}
                            categories={categories}
                            setCategories={setCategories}
                            minValue={minValue}
                            setMinValue={setMinValue}
                            maxValue={maxValue}
                            setMaxValue={setMaxValue}
                            fromDate={fromDate}
                            setFromDate={setFromDate}
                            upToDate={upToDate}
                            setUpToDate={setUpToDate}
                        />

                </div>
            </div>
            }
        </div>
    )
}

export default SearchExpenses;