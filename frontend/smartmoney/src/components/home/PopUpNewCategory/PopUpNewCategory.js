import React from 'react';
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

    const submitCategory = () => {

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
                <form className="formNewCategory">
                    <p className="label">Category name</p>
                    <input style={isMobileDevice ? (nameEmpty ? mobilStyles.inputEmpty : mobilStyles.input) : (nameEmpty ? webStyles.inputEmpty : webStyles.input)} type="text" value={name} onChange={e => setName(e.target.value)} onFocus={()=>setNameEmpty(false)} onBlur={()=>isEmpty(name,setNameEmpty)}/>
                    {nameEmpty&&<RequiredField/>}
                    <p className="label">Category icon</p>
                    <IconList numberColumns={4}/>
                    <input 
                    className="button1"
                    type="button" 
                    onClick={submitCategory} 
                    value="Save" 
                    disabled={nameEmpty||iconEmpty}/>
                </form>
                </div>
            </div>
        </div>
    )
}

export default PopUpNewCategory