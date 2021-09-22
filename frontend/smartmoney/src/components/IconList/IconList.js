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

const IconList = ({numberColumns}) => {

    const fun = () => {
        console.log("qwe")
    }

    const createTable = () => {
        let completeRows = Math.floor(78/numberColumns);
        let iconsExtraRow = 78 - (completeRows*numberColumns);
        console.log(iconsExtraRow)
        console.log(completeRows)
        let icons = [{label:"IoReceipt",component:<IoReceipt/>},
            {label:"IoCashOutline",component:<IoCashOutline/>},
            {label:"IoGameController", component:<IoGameController/>},
            {label:"IoCart",component:<IoCart/>},
            {label:"IoDesktopSharp",component:<IoDesktopSharp/>},
            {label:"IoCarSportSharp", component:<IoCarSportSharp/>},
            {label:"IoAccessibility",component:<IoAccessibility/>},
            {label:"IoArrowForwardOutline", component:<IoArrowForwardOutline/>},
            {label:"IoWineSharp",component:<IoWineSharp/>},
            {label:"IoAlarm",component:<IoAlarm/>},
            {label:"IoAirplane",component:<IoAirplane/>},
            {label:"IoAmericanFootball",component:<IoAmericanFootball/>},
            {label:"IoBag",component:<IoBag/>},
            {label:"IoAnalyticsOutline", component:<IoAnalyticsOutline/>},
            {label:"IoAttachSharp",component:<IoAttachSharp/>},
            {label:"IoBarChart",component:<IoBarChart/>},
            {label:"IoBarbell",component:<IoBarbell/>},
            {label:"IoBasketball",component:<IoBasketball/>},
            {label:"IoBed",component:<IoBed/>},
            {label:"IoBeerOutline",component:<IoBeerOutline/>},
            {label:"IoBicycle",component:<IoBicycle/>},
            {label:"IoBoat",component:<IoBoat/>},
            {label:"IoBook",component:<IoBook/>},
            {label:"IoBriefcase",component:<IoBriefcase/>},
            {label:"IoBrushOutline",component:<IoBrushOutline/>},
            {label:"IoBulbOutline",component:<IoBulbOutline/>},
            {label:"IoBus",component:<IoBus/>},
            {label:"IoBusiness",component:<IoBusiness/>},
            {label:"IoCafe",component:<IoCafe/>},
            {label:"IoCalculator",component:<IoCalculator/>},
            {label:"IoCallSharp",component:<IoCallSharp/>},
            {label:"IoCamera",component:<IoCamera/>},
            {label:"IoCarSport",component:<IoCarSport/>},
            {label:"IoCardOutline",component:<IoCardOutline/>},
            {label:"IoChatbubblesOutline", component:<IoChatbubblesOutline/>},
            {label:"IoCloudUploadOutline", component:<IoCloudUploadOutline/>},
            {label:"IoCodeSlash",component:<IoCodeSlash/>},
            {label:"IoColorFillOutline", component:<IoColorFillOutline/>},
            {label:"IoColorPaletteSharp", component:<IoColorPaletteSharp/>},
            {label:"IoConstructOutline",component:<IoConstructOutline/>},
            {label:"IoCutSharp",component:<IoCutSharp/>},
            {label:"IoDice",component:<IoDice/>},
            {label:"IoDocumentText",component:<IoDocumentText/>},
            {label:"IoEarOutline", component:<IoEarOutline/>},
            {label:"IoEarthSharp",component:<IoEarthSharp/>},
            {label:"IoExtensionPuzzleOutl", component:<IoExtensionPuzzleOutline/>},
            {label:"IoFastFoodOutline",component:<IoFastFoodOutline/>},
            {label:"IoFilmOutline",component:<IoFilmOutline/>},
            {label:"IoFingerPrintOutline", component:<IoFingerPrintOutline/>},
            {label:"IoTicketOutline", component:<IoTicketOutline/>},
            {label:"IoShirtOutline",component:<IoShirtOutline/>},
            {label:"IoSchool",component:<IoSchool/>},
            {label:"IoRocketOutline",component:<IoRocketOutline/>},
            {label:"IoRestaurantOutline", component:<IoRestaurantOutline/>},
            {label:"IoPrintOutline",component:<IoPrintOutline/>},
            {label:"IoPizzaOutline",component:<IoPizzaOutline/>},
            {label:"IoPhonePortrait", component:<IoPhonePortrait/>},
            {label:"IoPawSharp", component:<IoPawSharp/>},
            {label:"IoNewspaperOutline", component:<IoNewspaperOutline/>},
            {label:"IoNavigate", component:<IoNavigate/>},
            {label:"IoMusicalNotes", component:<IoMusicalNotes/>},
            {label:"IoMegaphoneOutline", component:<IoMegaphoneOutline/>},
            {label:"IoMedalOutline", component:<IoMedalOutline/>},
            {label:"IoFlag", component:<IoFlag/>},
            {label:"IoGolfOutline", component:<IoGolfOutline/>},
            {label:"IoFlame",component:<IoFlame/>},
            {label:"IoFlaskSharp", component:<IoFlaskSharp/>},
            {label:"IoFootballSharp", component:<IoFootballSharp/>},
            {label:"IoGiftSharp", component:<IoGiftSharp/>},
            {label:"IoHammer", component:<IoHammer/>},
            {label:"IoHeadset", component:<IoHeadset/>},
            {label:"IoHeartSharp",component:<IoHeartSharp/>},
            {label:"IoHeartHalfSharp", component:<IoHeartHalfSharp/>},
            {label:"IoHourglassOutline", component:<IoHourglassOutline/>},
            {label:"IoIceCreamOutline",component:<IoIceCreamOutline/>},
            {label:"IoKeyOutline",component:<IoKeyOutline/>},
            {label:"IoLibraryOutline",component:<IoLibraryOutline/>},
            {label:"IoShapes", component:<IoShapes/>}
        ];
        
            let table = [];
            let index = 0;
            for (let i = 0; i<completeRows;i++){
                let row = [];
                for (let j = 0; j<numberColumns; j++){
                    // row.push(<th key={'th-'+index}><button className="selectableIcon" onClick={fun}>{icons[index].component}</button></th>);
                    row.push(<th key={'th-'+index}>{icons[index].component}</th>);

                    index ++;
                }
                table.push(<tr key={'tr-'+index} >{row}</tr>)
            }
            if(iconsExtraRow>0){
                let row = [];
                for (let k = 0; k<iconsExtraRow; k++){
                    row.push(<th key={'th-'+index}><button className="selectableIcon" >{icons[index].component}</button></th>);
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
            {/* <button >hola</button> */}
                {createTable()}
        </div>
    )
}

export default IconList