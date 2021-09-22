import React from 'react';
import "./style.css";
import {useState} from 'react';
import { useMediaQuery } from 'react-responsive';
import { IoReceipt } from "@react-icons/all-files/io5/IoReceipt"; 
import { IoGameController } from "@react-icons/all-files/io5/IoGameController"; 
import { IoCart } from "@react-icons/all-files/io5/IoCart"; 
import { IoDesktopSharp } from "@react-icons/all-files/io5/IoDesktopSharp"; 
import { IoCarSportSharp } from "@react-icons/all-files/io5/IoCarSportSharp"; 
import { IoShapes } from "@react-icons/all-files/io5/IoShapes"; 
import { IoWineSharp } from "@react-icons/all-files/io5/IoWineSharp"; 
import { IoArrowForwardOutline } from "@react-icons/all-files/io5/IoArrowForwardOutline"; 
import { IoBook } from "@react-icons/all-files/io5/IoBook"; 
import { IoBoat } from "@react-icons/all-files/io5/IoBoat"; 
import { IoBicycle } from "@react-icons/all-files/io5/IoBicycle"; 
import { IoBeerOutline } from "@react-icons/all-files/io5/IoBeerOutline"; 
import { IoBed } from "@react-icons/all-files/io5/IoBed"; 
import { IoBasketball } from "@react-icons/all-files/io5/IoBasketball"; 
import { IoBarbell } from "@react-icons/all-files/io5/IoBarbell"; 
import { IoBarChart } from "@react-icons/all-files/io5/IoBarChart"; 
import { IoAttachSharp } from "@react-icons/all-files/io5/IoAttachSharp"; 
import { IoAnalyticsOutline } from "@react-icons/all-files/io5/IoAnalyticsOutline"; 
import { IoBag } from "@react-icons/all-files/io5/IoBag"; 
import { IoAmericanFootball } from "@react-icons/all-files/io5/IoAmericanFootball"; 
import { IoAirplane } from "@react-icons/all-files/io5/IoAirplane"; 
import { IoAlarm } from "@react-icons/all-files/io5/IoAlarm"; 
import { IoAccessibility } from "@react-icons/all-files/io5/IoAccessibility"; 
import { IoExtensionPuzzleOutline } from "@react-icons/all-files/io5/IoExtensionPuzzleOutline"; 
import { IoEarthSharp } from "@react-icons/all-files/io5/IoEarthSharp"; 
import { IoEarOutline } from "@react-icons/all-files/io5/IoEarOutline"; 
import { IoDocumentText } from "@react-icons/all-files/io5/IoDocumentText"; 
import { IoDice } from "@react-icons/all-files/io5/IoDice"; 
import { IoCutSharp } from "@react-icons/all-files/io5/IoCutSharp"; 
import { IoConstructOutline } from "@react-icons/all-files/io5/IoConstructOutline"; 
import { IoColorPaletteSharp } from "@react-icons/all-files/io5/IoColorPaletteSharp"; 
import { IoColorFillOutline } from "@react-icons/all-files/io5/IoColorFillOutline"; 
import { IoCodeSlash } from "@react-icons/all-files/io5/IoCodeSlash"; 
import { IoCloudUploadOutline } from "@react-icons/all-files/io5/IoCloudUploadOutline"; 
import { IoChatbubblesOutline } from "@react-icons/all-files/io5/IoChatbubblesOutline"; 
import { IoCardOutline } from "@react-icons/all-files/io5/IoCardOutline"; 
import { IoCarSport } from "@react-icons/all-files/io5/IoCarSport"; 
import { IoCamera } from "@react-icons/all-files/io5/IoCamera"; 
import { IoCallSharp } from "@react-icons/all-files/io5/IoCallSharp"; 
import { IoCalculator } from "@react-icons/all-files/io5/IoCalculator"; 
import { IoCafe } from "@react-icons/all-files/io5/IoCafe"; 
import { IoBusiness } from "@react-icons/all-files/io5/IoBusiness"; 
import { IoBus } from "@react-icons/all-files/io5/IoBus"; 
import { IoBulbOutline } from "@react-icons/all-files/io5/IoBulbOutline"; 
import { IoBrushOutline } from "@react-icons/all-files/io5/IoBrushOutline"; 
import { IoBriefcase } from "@react-icons/all-files/io5/IoBriefcase"; 
import { IoGolfOutline } from "@react-icons/all-files/io5/IoGolfOutline"; 
import { IoFlag } from "@react-icons/all-files/io5/IoFlag"; 
import { IoMedalOutline } from "@react-icons/all-files/io5/IoMedalOutline"; 
import { IoMegaphoneOutline } from "@react-icons/all-files/io5/IoMegaphoneOutline"; 
import { IoMusicalNotes } from "@react-icons/all-files/io5/IoMusicalNotes"; 
import { IoNavigate } from "@react-icons/all-files/io5/IoNavigate"; 
import { IoNewspaperOutline } from "@react-icons/all-files/io5/IoNewspaperOutline"; 
import { IoPawSharp } from "@react-icons/all-files/io5/IoPawSharp"; 
import { IoPhonePortrait } from "@react-icons/all-files/io5/IoPhonePortrait"; 
import { IoPizzaOutline } from "@react-icons/all-files/io5/IoPizzaOutline"; 
import { IoPrintOutline } from "@react-icons/all-files/io5/IoPrintOutline"; 
import { IoRestaurantOutline } from "@react-icons/all-files/io5/IoRestaurantOutline"; 
import { IoRocketOutline } from "@react-icons/all-files/io5/IoRocketOutline"; 
import { IoSchool } from "@react-icons/all-files/io5/IoSchool"; 
import { IoShirtOutline } from "@react-icons/all-files/io5/IoShirtOutline"; 
import { IoTicketOutline } from "@react-icons/all-files/io5/IoTicketOutline"; 
import { IoFingerPrintOutline } from "@react-icons/all-files/io5/IoFingerPrintOutline"; 
import { IoFilmOutline } from "@react-icons/all-files/io5/IoFilmOutline"; 
import { IoFastFoodOutline } from "@react-icons/all-files/io5/IoFastFoodOutline"; 
import { IoKeyOutline } from "@react-icons/all-files/io5/IoKeyOutline"; 
import { IoIceCreamOutline } from "@react-icons/all-files/io5/IoIceCreamOutline"; 
import { IoHourglassOutline } from "@react-icons/all-files/io5/IoHourglassOutline"; 
import { IoHeartHalfSharp } from "@react-icons/all-files/io5/IoHeartHalfSharp"; 
import { IoHeartSharp } from "@react-icons/all-files/io5/IoHeartSharp"; 
import { IoHeadset } from "@react-icons/all-files/io5/IoHeadset"; 
import { IoHammer } from "@react-icons/all-files/io5/IoHammer"; 
import { IoGiftSharp } from "@react-icons/all-files/io5/IoGiftSharp"; 
import { IoFootballSharp } from "@react-icons/all-files/io5/IoFootballSharp"; 
import { IoFlaskSharp } from "@react-icons/all-files/io5/IoFlaskSharp"; 
import { IoFlame } from "@react-icons/all-files/io5/IoFlame"; 
import { IoLibraryOutline } from "@react-icons/all-files/io5/IoLibraryOutline"; 
import { IoCashOutline } from "@react-icons/all-files/io5/IoCashOutline"; 

const IconList = ({numberColumns, setIcon}) => {


    function selectedIcon(icon){
        setIcon(icon)
    }

    const createTable = () => {
        let completeRows = Math.floor(78/numberColumns);
        let iconsExtraRow = 78 - (completeRows*numberColumns);
        console.log(iconsExtraRow)
        console.log(completeRows)
        let icons = [<IoReceipt onClick={()=>selectedIcon("IoReceipt")}/>,
            <IoCashOutline onClick={()=>selectedIcon("IoCashOutline")}/>,
            <IoGameController onClick={()=>selectedIcon("IoGameController")}/>,
            <IoCart onClick={()=>selectedIcon("IoCart")}/>,
            <IoDesktopSharp onClick={()=>selectedIcon("IoDesktopSharp")}/>,
            <IoCarSportSharp onClick={()=>selectedIcon("IoCarSportSharp")}/>,
            <IoAccessibility onClick={()=>selectedIcon("IoAccessibility")}/>,
            <IoArrowForwardOutline onClick={()=>selectedIcon("IoArrowForwardOutline")}/>,
            <IoWineSharp onClick={()=>selectedIcon("IoWineSharp")}/>,
            <IoAlarm onClick={()=>selectedIcon("IoAlarm")}/>,
            <IoAirplane onClick={()=>selectedIcon("IoAirplane")}/>,
            <IoAmericanFootball onClick={()=>selectedIcon("IoAmericanFootball")}/>,
            <IoBag onClick={()=>selectedIcon("IoBag")}/>,
            <IoAnalyticsOutline onClick={()=>selectedIcon("IoAnalyticsOutline")}/>,
            <IoAttachSharp onClick={()=>selectedIcon("IoAttachSharp")}/>,
            <IoBarChart onClick={()=>selectedIcon("IoBarChart")}/>,
            <IoBarbell onClick={()=>selectedIcon("IoBarbell")}/>,
            <IoBasketball onClick={()=>selectedIcon("IoBasketball")}/>,
            <IoBed onClick={()=>selectedIcon("IoBed")}/>,
            <IoBeerOutline onClick={()=>selectedIcon("IoBeerOutline")}/>,
            <IoBicycle onClick={()=>selectedIcon("IoBicycle")}/>,
            <IoBoat onClick={()=>selectedIcon("IoBoat")}/>,
            <IoBook onClick={()=>selectedIcon("IoBook")}/>,
            <IoBriefcase onClick={()=>selectedIcon("IoBriefcase")}/>,
            <IoBrushOutline onClick={()=>selectedIcon("IoBrushOutline")}/>,
            <IoBulbOutline onClick={()=>selectedIcon("IoBulbOutline")}/>,
            <IoBus onClick={()=>selectedIcon("IoBus")}/>,
            <IoBusiness onClick={()=>selectedIcon("IoBusiness")}/>,
            <IoCafe onClick={()=>selectedIcon("IoCafe")}/>,
            <IoCalculator onClick={()=>selectedIcon("IoCalculator")}/>,
            <IoCallSharp onClick={()=>selectedIcon("IoCallSharp")}/>,
            <IoCamera onClick={()=>selectedIcon("IoCamera")}/>,
            <IoCarSport onClick={()=>selectedIcon("IoCarSport")}/>,
            <IoCardOutline onClick={()=>selectedIcon("IoCardOutline")}/>,
            <IoChatbubblesOutline onClick={()=>selectedIcon("IoChatbubblesOutline")}/>,
            <IoCloudUploadOutline onClick={()=>selectedIcon("IoCloudUploadOutline")}/>,
            <IoCodeSlash onClick={()=>selectedIcon("IoCodeSlash")}/>,
            <IoColorFillOutline onClick={()=>selectedIcon("IoColorFillOutline")}/>,
            <IoColorPaletteSharp onClick={()=>selectedIcon("IoColorPaletteSharp")}/>,
            <IoConstructOutline onClick={()=>selectedIcon("IoConstructOutline")}/>,
            <IoCutSharp onClick={()=>selectedIcon("IoCutSharp")}/>,
            <IoDice onClick={()=>selectedIcon("IoDice")}/>,
            <IoDocumentText onClick={()=>selectedIcon("IoDocumentText")}/>,
            <IoEarOutline onClick={()=>selectedIcon("IoEarOutline")}/>,
            <IoEarthSharp onClick={()=>selectedIcon("IoEarthSharp")}/>,
            <IoExtensionPuzzleOutline onClick={()=>selectedIcon("IoExtensionPuzzleOutl")}/>,
            <IoFastFoodOutline onClick={()=>selectedIcon("IoFastFoodOutline")}/>,
            <IoFilmOutline onClick={()=>selectedIcon("IoFilmOutline")}/>,
            <IoFingerPrintOutline onClick={()=>selectedIcon("IoFingerPrintOutline")}/>,
            <IoTicketOutline onClick={()=>selectedIcon("IoTicketOutline")}/>,
            <IoShirtOutline onClick={()=>selectedIcon("IoShirtOutline")}/>,
            <IoSchool onClick={()=>selectedIcon("IoSchool")}/>,
            <IoRocketOutline onClick={()=>selectedIcon("IoRocketOutline")}/>,
            <IoRestaurantOutline onClick={()=>selectedIcon("IoRestaurantOutline")}/>,
            <IoPrintOutline onClick={()=>selectedIcon("IoPrintOutline")}/>,
            <IoPizzaOutline onClick={()=>selectedIcon("IoPizzaOutline")}/>,
            <IoPhonePortrait onClick={()=>selectedIcon("IoPhonePortrait")}/>,
            <IoPawSharp onClick={()=>selectedIcon("IoPawSharp")}/>,
            <IoNewspaperOutline onClick={()=>selectedIcon("IoNewspaperOutline")}/>,
            <IoNavigate onClick={()=>selectedIcon("IoNavigate")}/>,
            <IoMusicalNotes onClick={()=>selectedIcon("IoMusicalNotes")}/>,
            <IoMegaphoneOutline onClick={()=>selectedIcon("IoMegaphoneOutline")}/>,
            <IoMedalOutline onClick={()=>selectedIcon("IoMedalOutline")}/>,
            <IoFlag onClick={()=>selectedIcon("IoFlag")}/>,
            <IoGolfOutline onClick={()=>selectedIcon("IoGolfOutline")}/>,
            <IoFlame onClick={()=>selectedIcon("IoFlame")}/>,
            <IoFlaskSharp onClick={()=>selectedIcon("IoFlaskSharp")}/>,
            <IoFootballSharp onClick={()=>selectedIcon("IoFootballSharp")}/>,
            <IoGiftSharp onClick={()=>selectedIcon("IoGiftSharp")}/>,
            <IoHammer onClick={()=>selectedIcon("IoHammer")}/>,
            <IoHeadset onClick={()=>selectedIcon("IoHeadset")}/>,
            <IoHeartSharp onClick={()=>selectedIcon("IoHeartSharp")}/>,
            <IoHeartHalfSharp onClick={()=>selectedIcon("IoHeartHalfSharp")}/>,
            <IoHourglassOutline onClick={()=>selectedIcon("IoHourglassOutline")}/>,
            <IoIceCreamOutline onClick={()=>selectedIcon("IoIceCreamOutline")}/>,
            <IoKeyOutline onClick={()=>selectedIcon("IoKeyOutline")}/>,
            <IoLibraryOutline onClick={()=>selectedIcon("IoLibraryOutline")}/>,
            <IoShapes onClick={()=>selectedIcon("IoShapes")}/>
        ];
        
            let table = [];
            let index = 0;
            for (let i = 0; i<completeRows;i++){
                let row = [];
                for (let j = 0; j<numberColumns; j++){
                    // row.push(<th key={'th-'+index}><button className="selectableIcon" onClick={fun}>{icons[index].component}</button></th>);
                    row.push(<th key={'th-'+index}>{icons[index]}</th>);

                    index ++;
                }
                table.push(<tr key={'tr-'+index} >{row}</tr>)
            }
            if(iconsExtraRow>0){
                let row = [];
                for (let k = 0; k<iconsExtraRow; k++){
                    row.push(<th key={'th-'+index}>{icons[index]}</th>);
                    index ++;
                }
                table.push(<tr key={'tr-'+index} >{row}</tr>)
            }
            
        return ( 
            <table className="iconsRow">
                <tbody> 
                    {table}
                </tbody>
            </table>
        )
    }
    return(
        <div className="iconsContainer">
            {createTable()}
        </div>
    )
}

export default IconList