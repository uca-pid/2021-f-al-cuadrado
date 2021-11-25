import React from 'react';
import "./style.css";
import {useState, useEffect} from 'react';
import { IoPencil} from "@react-icons/all-files/io5/IoPencil"; 
import { IoTrashOutline } from "@react-icons/all-files/io5/IoTrashOutline"; 
import FlatList from 'flatlist-react';

const PopUpEditCategoires = ({closePopUp, openPopUpEditCategory, openPopUpDeleteCategory, update, openPopUpSessionExpired}) => {

    
    const [customCategories, setCustomCategories] = useState([]);
    const [errorMessage, setErrorMessage] = useState('')

    const getcustomCategories = () => {
        let categories = [];
        const session = JSON.parse(localStorage.session);
        const date = new Date();
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: session.code, month:date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()})
        };
        fetch('https://smart-money-back.herokuapp.com/categories/'+session.user_id+'/', requestOptions)
          .then(response => response.json())
          .then(data => {
              
            data.map(category => {
                if(category.user_id!==null){
                    categories.push(category)
                }
            })
            setCustomCategories({...categories});
            if(data.length===6)setErrorMessage("There is no custom categories yet!")
          })
          .catch(error => openPopUpSessionExpired())
        

    }
    useEffect(() => getcustomCategories(),[update])

    const renderCategory = (item)=> {
        return (
          <tr className = "customCategoryRow" onClick={()=>openPopUpEditCategory(item)}>
            <th className = "borderBottomRow tableNameWidth">{item.name}</th>
            <th className = "borderBottomRow tableEditWidth"><IoPencil className="editCategoryIconTableEditCategories"/></th>
            <th className = "borderBottomRow tableDeleteWidth"><IoTrashOutline className="deleteCategoryIconTableEditCategories" onClick={(event)=>{openPopUpDeleteCategory(item);event.stopPropagation()}}/></th>
          </tr>        
        )  
    }

    return (
        <div className="popUpComponent">
            <button className="popUpBackground" onClick={closePopUp}/>
            <div className="editCategoriesContainer">
                <button className="closeEditCategories" onClick={closePopUp}>X</button>
                <div className="divCenteredItems">
                    <p className="popUpTitle">Edit categories</p>
                    <table className = "editCategoriesTable">
                        <tbody className = "editCategoriesBody">
                            <FlatList 
                                list={customCategories}
                                renderItem={renderCategory}
                                keyExtractor={(item) =>  item.id}
                                renderWhenEmpty={() => <tr><th><p>{errorMessage}</p></th></tr>}
                            />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default PopUpEditCategoires;