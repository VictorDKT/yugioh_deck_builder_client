import { CgProfile } from "react-icons/cg";
import './TopBar.css';
import { useEffect, useState } from "react";
import { openLoginModal } from "../ModalsProvider";

export function TopBar() {
    const [exitModalIsOpen, setExitModalIsOpen] = useState(false);
    const [dataFormat, setDataFormat] = useState("json");
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(()=>{
        const dataFormat = localStorage.getItem("data_format");

        if(dataFormat) {
            setDataFormat(dataFormat);
        }
    }, [])

    return (
        <div className="top-bar">
            <div className="data-type-container">
                <div className="data-type-buttons-container">
                    <div 
                        className={`data-type-button ${dataFormat === "json" ? "data-type-button-selected" : ""}`}
                        onClick={()=>{
                            localStorage.setItem("data_format", "json")
                            setDataFormat("json");
                        }}
                    >
                        JSON
                    </div>
                    <div 
                        className={`data-type-button ${dataFormat === "xml" ? "data-type-button-selected" : ""}`}
                        onClick={()=>{
                            localStorage.setItem("data_format", "xml")
                            setDataFormat("xml");
                        }}
                    >
                        XML
                    </div>
                </div>
            </div>
            <div className="pages-container">
                <div>
                
                </div>
            </div>
            <div
                className="profile-container"
                onClick={()=>{
                    if(!user) {
                        openLoginModal()
                    } else {
                        setExitModalIsOpen(!exitModalIsOpen)
                    }
                }}
            >
                {exitModalIsOpen ? 
                    <div 
                        className="exit-button"
                        onClick={()=>{
                            localStorage.removeItem("token");
                            localStorage.removeItem("user");
                        }}
                    >
                        Sair
                    </div>
                : ""}
                <CgProfile className="profile-icon"/>
                {user ? user.login : "Login"}
            </div>
        </div>
    )
}