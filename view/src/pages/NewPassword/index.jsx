import React, { useState } from 'react';
import './NewPassword.css';
import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios'
// import { useCookies } from 'react-cookie';

function NewPassword() {

    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const navigate = useNavigate();

    // const [cookies, setCookie] = useCookies(['jwtToken']);
    // const [cookie] = useCookies(['jwtToken']);

    /*
    useEffect(()=>{
        try {
            var cookieValue = document.cookie.split(';').map(cookie => cookie.split('=')).reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
            let token = cookieValue.jwtToken.toString();
            console.log(token);
        
            axios.post("http://localhost:3000/users/token", {
                token: token
            }).then(function(response) {
                if(!(response.data < 0)){
                    navigate("/detail");
                }
            }).catch(function(error) {
                console.error(error);
            });
        } catch (err) {
            //console.error('Ocorreu um erro:', err);
        }
        
  },[]);*/

    const handleSubmit = (event) => {
        event.preventDefault(); // previne que o usuário não mande o campo em branco

        if (novaSenha !== confirmarSenha) {
            alert('As senhas não coincidem! Por favor, verifique.');
            return; // Impede o envio do formulário se as senhas não coincidirem
        }

        // manda o que o usuário enviou nos campos, para o console
        console.log("Nova Senha:", novaSenha);
        console.log("Confirmar senha:", confirmarSenha);

        /*axios.post("http://localhost:3000/users/newPassword", {
            novaSenha: novaSenha,
            confirmarSenha: confirmarSenha
        }).then(function (response) {
        if(response.data !=  'NovaSenha INEXISTENTE' && response.data !=  'SENHA INCORRETA'){
        setCookie('jwtToken', response.data, {
                path: '/'
        });
            navigate("/detail");
        }

      }).catch(function (error) {
            console.log(error);
            });*/

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