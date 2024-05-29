import React, { useState } from 'react';
import './PasswordRecovery.css';
import { Link } from 'react-router-dom';

function PasswordRecovery() {

const [email, setEmail] = useState('');

const handleEmailChange = (event) => {
    setEmail(event.target.value);
}

const handleSubmit = (event) =>{
    event.preventDefault();
    console.log("email:", email)

    setEmail('');

    alert("email : "+email);
}

    return (
        <body id="paginaPasswordRecovery">
            <div className=' divC'>
                <Link to= '/Login'>
                    <img className='img-setaRecovery' src='/seta.svg' alt ='seta'/>
                </Link>
                <span className='title'> Esqueceu a senha?</span>
                <span className='sub-title'> Coloque seu e-mail</span>
                <form onSubmit={handleSubmit}>
                    <input
                    type = "text"
                    placeholder='E-mail'
                    value ={email}
                    onChange = {handleEmailChange}
                    />
                    <button type="submit"> Enviar</button>
                </form>
            </div>
        </body>
);
}

export default PasswordRecovery;
