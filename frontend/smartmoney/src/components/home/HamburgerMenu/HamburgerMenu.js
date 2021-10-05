import React from 'react';
import {useState} from 'react';
import "./style.css";
import { IoAddCircle } from "@react-icons/all-files/io5/IoAddCircle"; 
import { IoBarChart } from "@react-icons/all-files/io5/IoBarChart"; 
import { IoHome } from "@react-icons/all-files/io5/IoHome"; 
import { IoDocumentText } from "@react-icons/all-files/io5/IoDocumentText"; 
import { IoCashOutline } from "@react-icons/all-files/io5/IoCashOutline"; 
import { IoLogOutOutline } from "@react-icons/all-files/io5/IoLogOutOutline"; 
import { IoSettingsSharp } from "@react-icons/all-files/io5/IoSettingsSharp"; 
import { IoPieChart } from "@react-icons/all-files/io5/IoPieChart"; 
import { useMediaQuery } from 'react-responsive';


const HamburgerMenu = ({
    hamburger, 
    changePassword, 
    newExpense, 
    newCategory,
    home,
    monthSummary,
    expenseHistory,
    searchExpenses
    }) => {

    const isMobileDevice = useMediaQuery({
        query: "(max-device-width: 480px)",
      });

    const logout = () => {
        localStorage.clear();
        window.location.href = "./"
    }
    return (
        <div className="hamburgerMenuContainer" style={isMobileDevice ? (hamburger ? {width:230}:{display:'none'}) : (hamburger ? {width:230}:{width:60})}>

            <button className="hamburgerMenuButton" onClick={home}>
                <IoHome className = "hamburgerMenuIcon" color="#7346c7"/>
                {hamburger && 
                    <p className = "hamburgerMenuText">Home</p>
                }
            </button>
            <button className="hamburgerMenuButton" onClick={monthSummary}>
                <IoPieChart className = "hamburgerMenuIcon" color="#7346c7"/>
                {hamburger && 
                    <p className = "hamburgerMenuText">Month summary</p>
                }
            </button>
            <button className="hamburgerMenuButton" onClick={expenseHistory}>
                <IoBarChart className = "hamburgerMenuIcon" color="#7346c7"/>
                {hamburger && 
                    <p className = "hamburgerMenuText">Expense history</p>
                }
            </button>
            <button className="hamburgerMenuButton" onClick={searchExpenses}>
                <IoDocumentText className = "hamburgerMenuIcon" color="#7346c7"/>
                {hamburger && 
                    <p className = "hamburgerMenuText">Search expenses</p>
                }
            </button>
            <div className="menuSeparationLine"/>
            <button className="hamburgerMenuButton" onClick={newExpense}>
                <IoCashOutline className = "hamburgerMenuIcon" color="#7346c7"/>
                {hamburger && 
                    <p className = "hamburgerMenuText">Add expense</p>
                }
                </button>
            

            <button className="hamburgerMenuButton" onClick={newCategory}>
                <IoAddCircle className = "hamburgerMenuIcon" color="#7346c7"/>
                {hamburger && 
                    <p className = "hamburgerMenuText">Add category</p>
                }
                </button>
            <div className="hamburgerMenuBottomButtonsContainer">
                <button className="hamburgerMenuButton" onClick={changePassword}>
                    <IoSettingsSharp className = "hamburgerMenuIcon" color="#7346c7"/>
                    {hamburger && 
                        <p className = "hamburgerMenuText">Change password</p>
                    }
                    </button>
                <button className="hamburgerMenuButton" onClick={logout}>
                    <IoLogOutOutline className = "hamburgerMenuIcon" color="#7346c7"/>
                    {hamburger && 
                        <p className = "hamburgerMenuText">Logout</p>
                    }
                    </button>
            </div>
        </div>
    )
}

export default HamburgerMenu;