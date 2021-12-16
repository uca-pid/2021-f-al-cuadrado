import React from 'react';
import "./style.css";
import FlatList from 'flatlist-react';
import icons from "../../../functions/icons";
import Checkbox from "react-custom-checkbox";
import { IoCheckmarkSharp } from "@react-icons/all-files/io5/IoCheckmarkSharp"; 

const Categories = ({categories,changeSelectedCategories, openPopUpCategoryDetails,month}) => {

   const categoryDetails = (category) => {
       console.log(month)
        openPopUpCategoryDetails(category,month);
   }

    const renderCategories = (item, index)=> {
        let total = 0;
        if (item.total!==null) total = item.total;
        return (
          <tr className = "categoriesRow" key={item.name} >
            <th className = "tableCheckbox">
                <Checkbox 
                    icon={<div style={{display:'flex' ,backgroundColor:item.color, width:'100%', height:'100%', justifyContent:'center'}}><IoCheckmarkSharp/></div>} 
                    borderColor={item.color}
                    checked={item.isSelected}
                    disabled= {item.isDisabled}
                    onChange={(e)=>changeSelectedCategories(item, e)}/>
            </th> 
            <th className = "categoriesValue tableIcon" onClick={()=>categoryDetails(item)}>{icons(item.icon)}</th> 
            <th className = "categoriesValue tableCategory" onClick={()=>categoryDetails(item)}>{item.name}</th>
            <th className = "categoriesValue tableTotal" onClick={()=>categoryDetails(item)}>$ {total}</th>
          </tr>        
        )  
    }

    return(
        <div className="cardContainer cardContainerCategories">

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
        </div>
    )
}

export default Categories