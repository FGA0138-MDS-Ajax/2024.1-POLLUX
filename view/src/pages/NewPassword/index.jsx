/**
   Página de redefinição de senha, utiliza:
   - useState para gerenciar estados locais para novaSenha, confirmarSenha.
   - useNavigate para navegação programática após a redefinição da senha.
   - useParams para capturar o token de redefinição de senha da URL.

   Envia uma solicitação POST para o backend com novaSenha e o token para 
   redefinir a senha do usuário. Exibe alertas para sucesso ou falha na redefinição da senha.
 */

import React, { useState } from 'react';
import './NewPassword.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'

function NewPassword() {

    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const navigate = useNavigate();
    const { token } = useParams();

    // Função para lidar com o envio do formulário

    const handleSubmit = (event) => {
        event.preventDefault(); // previne que o usuário não mande o campo em branco

        if (novaSenha !== confirmarSenha) {
            alert('As senhas não coincidem! Por favor, verifique.');
            return; // Impede o envio do formulário se as senhas não coincidirem
        }

        // Envia uma solicitação POST para redefinir a senha
        axios.post("http://18.209.49.236:3000/password/reset", {
            password: novaSenha,
            token: token
        }).then(function (response) {
            alert('senha alterada com sucesso.');
            navigate("/");
        }).catch(function (error) {
            console.log(error);
        });

    };

    return (
        <>
            <div id="paginaNewPassword">
                <div className='containerNewPassword'>
                    <Link to="/login">
                        <img className='setaNewPassword' src='/seta.svg' alt='seta' />
                    </Link>
                    <span className='titleNewPassword'>REDEFINIÇÃO DE SENHA</span>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="password" // Tipo password para ocultar a senha
                            placeholder='Nova senha:'
                            value={novaSenha}
                            onChange={(e) => setNovaSenha(e.target.value)} // Atualiza o estado da nova senha
                        />
                        <input
                            type="password" // Tipo password para ocultar a senha
                            placeholder='Confirmar senha:'
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)} // Atualiza o estado da confirmação da senha
                        />
                        <button type="submit" className='bntSalvarSenha'> SALVAR </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default NewPassword;