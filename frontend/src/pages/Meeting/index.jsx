import React, {useState} from "react";
import './Meeting.css';
import SideBar from "../../components/SideBar"

function Meeting(){

    return(
            <>
            <div className="sidebar">
                <SideBar/>
            </div>
            <section className="container">
            <div>
                <button className="btn"> Adicionar reunião </button>
            </div>
            </section>            
            
            </>

         )
}

export default Meeting ; 