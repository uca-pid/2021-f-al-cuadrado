import React from 'react';
import {useState, useEffect} from 'react';
import FlatList from 'flatlist-react';
import icons from "../../../functions/icons";
import { IoArrowBack } from "@react-icons/all-files/io5/IoArrowBack"; 
import { IoPencil} from "@react-icons/all-files/io5/IoPencil"; 


const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const PopUpCategory = ({month, closePopUp, openPopUpCategoryDetails,update}) => {

    const [categories, setCategories] = useState([]);

    function fetchCategories(){
        const session = JSON.parse(localStorage.session);
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: session.code,
                                month: month})
        };
        fetch('https://smart-money-back.herokuapp.com/categories/'+session.user_id+'/', requestOptions)
          .then(response => response.json())
          .then(data => {
              setCategories(data);
            });
    }
    useEffect(() => fetchCategories(),[update])

   const categoryDetails = (category,month) => {
        openPopUpCategoryDetails(category,month);
   }

    const renderCategories = (item, index)=> {
        let total = 0;
        if (item.total!==null) total = item.total;
        return (
          <tr className = "categoriesRow" key={item.name} onClick={()=>categoryDetails(item,month)}>
            <th className = "categoriesValue tableIcon">{icons(item.icon)}</th> 
            <th className = "categoriesValue tableCategory">{item.name}</th>
            <th className = "categoriesValue tableTotal">$ {total}</th>
          </tr>        
        )  
    }

    return(
        <div className="popUpComponent">
            <button className="popUpBackground" onClick={closePopUp}/>
            <div className="categoryDetailsContainer">
                <IoArrowBack className="closeCategoryDetails" onClick={closePopUp}/>
                <div className="divCenteredItems">
                    <p className="popUpTitle">{monthNames[month.split("-")[1]-1]} {month.split("-")[0]}</p>
                    <table className = "categoryDetailsTable">
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
                        />
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default PopUpCategory