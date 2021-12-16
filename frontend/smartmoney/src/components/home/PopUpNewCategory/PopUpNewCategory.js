import React, { cloneElement } from 'react';
import "./style.css";
import {useState,useEffect} from 'react';
import RequiredField from '../../RequiredField/requiredField';
import { useMediaQuery } from 'react-responsive';
import webStyles from "../webStyles";
import mobilStyles from "../mobilStyles";
import icons from '../../../functions/icons';
import IconList from '../../IconList';


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



const PopUpNewCategory = ({closePopUp, state, categoryToEdit, openPopUpCantCreateCategory, openPopUpSessionExpired}) => {

    const isMobileDevice = useMediaQuery({
        query: "(max-device-width: 480px)",
    });

    const [title, setTitle] = useState('New category');
    const [name, setName] = useState('');
    const [nameEmpty, setNameEmpty] = useState('');
    const [iconEmpty, setIconEmpty] = useState('');
    const [selectedIcon, setSelectedIcon] = useState('');

    const loadEditFiles = () =>{
        if(state==='Edit'){
          setTitle("Edit category")
          setName(categoryToEdit.name);
          setSelectedIcon(categoryToEdit.icon);
        }
      }
    useEffect(() => loadEditFiles(),[state, categoryToEdit])

    const submitCategory = () => {
        (state==='New') ? submitNewCategory() : submitEditCategory();
      }

    const submitNewCategory = () => {
        if(name==='')setNameEmpty(true);
        if(selectedIcon==='')setIconEmpty(true);
        if(name!==''&&selectedIcon!==''){
            const session = JSON.parse(localStorage.session);
            const requestOptionsNewExpense = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    code: session.code, 
                    category_name: name,
                    icon: selectedIcon,
                })
            };
            fetch('https://smart-money-back.herokuapp.com/new_category/'+session.user_id+'/', requestOptionsNewExpense)
            .then((response) => {
              if(response.status===201){
                updaCategoriesList(name);
                closePopUp();
              }
              if(response.status===400){
                openPopUpCantCreateCategory()
              }
              if(response.status===401){
                openPopUpSessionExpired()
              }
            });
        } 
    }
    const submitEditCategory = () =>{
        if(name==='')setNameEmpty(true);
        if(selectedIcon==='')setIconEmpty(true);
        if(name!==''&&selectedIcon!==''){
          const session = JSON.parse(localStorage.session);
          const requestOptionsNewExpense = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                code: session.code, 
                category_id: categoryToEdit.id,
                name: name,
                icon: selectedIcon
            })
          };
          console.log(requestOptionsNewExpense.body)
          fetch('https://smart-money-back.herokuapp.com/edit_category/'+session.user_id+'/', requestOptionsNewExpense)
            .then((response) => {
              if(response.status===200){
                updaCategoriesList(name);
                closePopUp();

              }
              if(response.status===400){
                openPopUpCantCreateCategory()
              }
              if(response.status===401){
                openPopUpSessionExpired()
              }
            });
        } 
      }

    function updaCategoriesList(category){
        let allCategories = localStorage.allCategories.split(',');
        allCategories.push(category);
        localStorage.setItem('allCategories',allCategories);

    }

    function isEmpty(input, isEmpty){
        if(input==='')isEmpty(true)
    }

    return (
        <div className="popUpComponent">
            <button className="popUpBackground" onClick={closePopUp}/>
            <div className="newCategoryContainer">
                <button className="closeNewCategory" onClick={closePopUp}>X</button>
                <div className="divCenteredItems">
                <p className="popUpTitle">{title}</p>
                <div className="divNewCategory">
                    <TextField
                    label = "Category name" variant = 'outlined' 
                    margin = "dense"
                    size ="small"
                    //style={isMobileDevice ? (nameEmpty ? mobilStyles.inputEmpty : mobilStyles.input) : (nameEmpty ? webStyles.inputEmpty : webStyles.input)} 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    onFocus={()=>setNameEmpty(false)} 
                    onBlur={()=>isEmpty(name,setNameEmpty)}/>
                    {nameEmpty&&<RequiredField/>}
                    <div style={{display:'flex', flexDirection:'row', alignItems:'center', marginTop:10, marginBottom:10}}>
                        <p className="label" style={{margin:0}}>Category icon</p>
                        <div style={{display:'flex', width:30, height:30, borderStyle:'solid', border: 1, marginLeft:15, justifyContent:'center',alignItems:'center'}}>
                            {icons(selectedIcon,"selectedIcon")}
                        </div>
                    </div>
                    <IconList numberColumns={4} setIcon={setSelectedIcon}/>
                    {iconEmpty&&<RequiredField/>}
                    <Button 
                    style = {{marginTop: '5%'}}
                    variant = 'contained'
                    type="button" 
                    className="button1"
                    type="button" 
                    onClick={submitCategory}  
                    disabled={nameEmpty||iconEmpty}>
                    Save
                    </Button>
                    
                </div>
                </div>
            </div>
        </div>
    )
}

export default PopUpNewCategory