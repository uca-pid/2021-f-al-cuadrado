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
                    >Cambiar contraseña</button>
                <button 
                    className="menuButton"   
                    type="button" 
                    onClick={logout} 
                    >Cerar sesión</button>
            </div>
      </div>
    )
}

export default Menu;