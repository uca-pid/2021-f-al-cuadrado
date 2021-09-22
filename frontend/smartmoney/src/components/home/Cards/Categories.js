import React from 'react';
import {useState, useEffect} from 'react';
import "./style.css";
import webStyles from "../webStyles";
import mobilStyles from "../mobilStyles";
import { useMediaQuery } from 'react-responsive';
import FlatList from 'flatlist-react';
import icons from "../../../functions/icons";
// import TableScrollbar from 'react-table-scrollbar';

//#TODO sacar parche
const iconsNames = ["IoReceipt","IoGameController","IoCart","IoWineSharp","IoDesktopSharp", "IoShapes"]

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
          .then(data => {
              setCategories(data);
              console.log(categories);
              let allCategories = [];
              data.map( obj => {allCategories.push(obj.name)});
              localStorage.setItem('allCategories',allCategories);
            });
    }

   // useEffect(() => fetchCategories())



    const renderCategories = (item, index)=> {
        let total = 0;
        if (item.total!==null) total = item.total;
        return (
          <tr className = "categoriesRow" key={item.id}>
            <th className = "categoriesValue tableIcon">{icons(item.icon)}</th> 
            <th className = "categoriesValue tableCategory">{item.name}</th>
            <th className = "categoriesValue tableTotal">$ {total}</th>
          </tr>        
        )  
    }

    return(
        <div className="tableContainer">
            {/* <TableScrollbar> */}
            <div className="cardTitleContainer">
                <p className="cardTitle">Current month</p>
                {/* <button className="cardViewAll">
                    <p>See all</p>
                    {icons("IoArrowForwardOutline")}
                </button> */}
            </div>
            <table className = "categoriesHomeTable">
                <thead className = "categoriesHomeTableHead">
                    <tr className = "headCategoriesRow">
                        <th className = "tableIcon"></th>
                        <th className = "tableCategory">Category</th>
                        <th className = "tableTotal">Total</th>
                    </tr>
                </thead>
                <tbody className = "categoriesHomeTableBody">
                    <FlatList 
                        list={categories}
                        renderItem={renderCategories}
                        renderWhenEmpty={() => <tr><th><button onClick={fetchCategories}>There is no expense yet!</button></th></tr>}
                    />
                </tbody>
            </table>
            {/* </TableScrollbar> */}
        </div>
    )
}

export default Categories