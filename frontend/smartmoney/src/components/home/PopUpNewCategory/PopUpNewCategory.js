import React, { cloneElement } from 'react';
import "./style.css";
import {useState} from 'react';
import RequiredField from '../../RequiredField/requiredField';
import { useMediaQuery } from 'react-responsive';
import webStyles from "../webStyles";
import mobilStyles from "../mobilStyles";
import icons from '../../../functions/icons';
import IconList from '../../IconList';

const PopUpNewCategory = ({closePopUp}) => {

    const isMobileDevice = useMediaQuery({
        query: "(max-device-width: 480px)",
    });

    const [name, setName] = useState('');
    const [nameEmpty, setNameEmpty] = useState('');
    const [iconEmpty, setIconEmpty] = useState('');
    const [selectedIcon, setSelectedIcon] = useState('');

    const submitCategory = () => {
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
                  closePopUp();
              }
            });
        } 
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
                <p className="popUpTitle">New category</p>
                <div className="divNewCategory">
                    <p className="label">Category name</p>
                    <input style={isMobileDevice ? (nameEmpty ? mobilStyles.inputEmpty : mobilStyles.input) : (nameEmpty ? webStyles.inputEmpty : webStyles.input)} type="text" value={name} onChange={e => setName(e.target.value)} onFocus={()=>setNameEmpty(false)} onBlur={()=>isEmpty(name,setNameEmpty)}/>
                    {nameEmpty&&<RequiredField/>}
                    <div style={{display:'flex', flexDirection:'row', alignItems:'center', marginTop:10, marginBottom:10}}>
                        <p className="label" style={{margin:0}}>Category icon</p>
                        <div style={{display:'flex', width:30, height:30, borderStyle:'solid', border: 1, marginLeft:15, justifyContent:'center',alignItems:'center'}}>
                            {icons(selectedIcon,"selectedIcon")}
                        </div>
                    </div>
                    <IconList numberColumns={4} setIcon={setSelectedIcon}/>
                    {iconEmpty&&<RequiredField/>}
                    <input 
                    className="button1"
                    type="button" 
                    onClick={submitCategory} 
                    value="Save" 
                    disabled={nameEmpty||iconEmpty}/>
                    
                </div>
                </div>
            </div>
        </div>
    )
}

export default PopUpNewCategory