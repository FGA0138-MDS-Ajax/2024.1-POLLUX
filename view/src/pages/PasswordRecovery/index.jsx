/*
  Página de recuperação de senha, permite que o usuário solicite 
  a recuperação de senha enviando um e-mail. Utiliza Axios para 
  enviar uma solicitação POST para a API RESTful que trata a 
  recuperação de senha. Exibe feedback ao usuário através de alertas 
  em caso de sucesso ou erro no envio do e-mail.
*/

import React, { useState } from 'react';
import './PasswordRecovery.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PasswordRecovery() {

    const [email, setEmail] = useState('');

    // Função para atualizar o estado do email conforme o usuário digita

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    // Função para lidar com o envio do formulário de recuperação de senha

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://18.209.49.236:3000/password/forgot", {
            email: email
        }).then(function (response) {
            //console.log(response.data); // Log a resposta do backend para debug
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
