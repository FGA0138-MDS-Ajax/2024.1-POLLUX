import React, {useState} from "react";
import './Detail.css';
import SideBar from "../../components/SideBar"

function Detail(){

    return(
            <>
            <SideBar/>
            <section className='containerDetail'>
            <div className="edraDetail">
                <img className="img-edraV" src="/edraV.svg" alt="logo edraV"/>
            </div>
            <div className="conteudo1">
                <p>Olá usuário!</p>     
            </div>

            <div className="conteudo2">
                <p> Nome:<br/>
                    Matrícula: <br/>
                    Cargo:</p>  
            </div>

            <div className="conteudo3">
                <p> Alterar senha:<br/>
                    Confirmar senha:</p>     
            </div>
            </section>
           </>
         )
}

export default Detail; 