import React from 'react';
import {useState, useEffect} from 'react';
import "./style.css";
import FlatList from 'flatlist-react';
import icons from "../../../functions/icons";

const Categories = ({openPopUpCategoryDetails, update}) => {

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
              let allCategories = [];
              data.map( obj => {allCategories.push(obj.name)});
              localStorage.setItem('allCategories',allCategories);
            });
    }

   useEffect(() => fetchCategories(),[update])

   const categoryDetails = (category) => {
        openPopUpCategoryDetails(category);
   }



    const renderCategories = (item, index)=> {
        let total = 0;
        if (item.total!==null) total = item.total;
        return (
          <tr className = "categoriesRow" key={item.name} onClick={()=>categoryDetails(item)}>
            <th className = "categoriesValue tableIcon">{icons(item.icon)}</th> 
            <th className = "categoriesValue tableCategory">{item.name}</th>
            <th className = "categoriesValue tableTotal">$ {total}</th>
          </tr>        
        )  
    }

    return(
        <div className="cardContainer cardContainerHomeContent">
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
                        renderWhenEmpty={() => <tr><th><p>There is no expense yet!</p></th></tr>}
                    />
                </tbody>
            </table>
            {/* </TableScrollbar> */}
        </div>
    )
}

export default Categories