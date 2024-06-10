import React, {useState} from "react";
import './MemberArea.css';
import SideBar from "../../components/SideBar"

function MemberArea(){

    return(
            <>
            <div class= "sidebar">
                <SideBar/>
            </div>

            <section className='container'>
            <div>
                <edraLogo>
                    <figure>
                        <img className="img-edraV" src="/edraV.svg" alt="logo edraV"/>
                    </figure>
                </edraLogo>
            </div>
            </section>
           </>
         )
}

export default MemberArea; 