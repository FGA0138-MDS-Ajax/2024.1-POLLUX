import React, { useState } from 'react';
import './PasswordRecovery.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PasswordRecovery() {

    const [email, setEmail] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:3000/password/forgot", {
            email: email
        }).then(function (response) {
            console.log(response.data); // Log a resposta do backend para debug
            alert("Email enviado com sucesso!"); // Exibe um alerta ou mensagem de sucesso
            setEmail(''); // Limpa o campo de email após o envio
        }).catch(function (error) {
            console.error(error); // Log de erros para debug
            alert("E-mail nao encontrado."); // Exibe um alerta ou mensagem de erro
        });
    }

    return (
        <body id="paginaPasswordRecovery">
            <div className=' divC'>
                <Link to='/Login'>
                    <img className='img-setaRecovery' src='/seta.svg' alt='seta' />
                </Link>
                <span className='title'> Esqueceu a senha?</span>
                <span className='sub-title'> Coloque seu e-mail</span>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder='E-mail'
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <button type="submit"> Enviar</button>
                </form>
            </div>
        </body>
    );
}

export default PasswordRecovery;
