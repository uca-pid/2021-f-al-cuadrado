import React from 'react';
import "./style.css";
import logoHorizontal from "../../../images/logoHorizontal.png"; 
import configurationIcon from "../../../images/configuration.png"; 

const Header = ({configurationMenu}) => {

    return (
        <div className="menuContainer">
            <img src={logoHorizontal} className="logoHorizontal"/>
            <div>
                <button className="configurationButton"type="button" onClick={configurationMenu} >
                    <img src={configurationIcon} className = "configurationIcon"/>
                </button>
            </div>
        </div>
    )
}

export default Header;