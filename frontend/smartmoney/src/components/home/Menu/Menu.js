import React from 'react';
import "./style.css";

const Menu = ({openPopUpChangePassword}) => {

    function logout() {
        localStorage.clear();
        window.location.href = "./"
    }

    return(
        <div>
            <div  className="configurationMenu">
                <button 
                    className="menuButton"  
                    type="button" 
                    onClick={openPopUpChangePassword} 
                    >Change password</button>
                <button 
                    className="menuButton"   
                    type="button" 
                    onClick={logout} 
                    >Logout</button>
            </div>
      </div>
    )
}

export default Menu;