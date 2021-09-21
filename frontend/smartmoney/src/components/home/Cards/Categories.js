import React from 'react';
import {useState, useEffect} from 'react';
import "./style.css";
import webStyles from "../webStyles";
import mobilStyles from "../mobilStyles";
import { useMediaQuery } from 'react-responsive';
import FlatList from 'flatlist-react';

const Categories = () => {

    const [categories, setCategories] = useState([]);

    function fetchCategories(){
        const session = JSON.parse(localStorage.session);
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: session.code})
        };
        fetch('https://smart-money-back.herokuapp.com/categories/'+session.user_id+'/', requestOptions)
          .then(response => response.json())
          .then(data => {setCategories(data);console.log(categories)});

    }

   // useEffect(() => fetchCategories())

    const renderCategories = (item, index)=> {
        let total = 0;
        if (item.total!==null) total = item.total;
        return (
          <tr className = "categoryRow">
            <th className = "categoryValue">{item.i}</th>
            <th className = "categoryValue">{item.name}</th>
            <th className = "categoryValue">$ {total}</th>
          </tr>        
        )  
    }

    return(
        <div className="tableContainer">
            <table className = "categoriesHomeTable">
                <thead>
                    <tr>
                    <th></th>
                    <th>Category</th>
                    <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <FlatList 
                        list={categories}
                        renderItem={renderCategories}
                        sort={{by:"id"}}
                        renderWhenEmpty={() => <tr><th><button onClick={fetchCategories}>There is no expense yet!</button></th></tr>}
                    />
                </tbody>
            </table>
        </div>
    )
}

export default Categories