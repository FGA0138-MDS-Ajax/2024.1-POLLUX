/*
   Página de login, utiliza:
   - useState para gerenciar estados locais para matrícula e senha.
   - useEffect para verificar se o usuário já está autenticado através dos cookies.
   - useCookies para acessar e definir cookies no navegador.
   - useNavigate para navegação programática após o login.
*/

import { useState, useEffect } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useCookies } from 'react-cookie';

// Dentro do seu componente ou função assíncrona onde você está fazendo a requisição
function Login() {
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');
    const [cookies, setCookie] = useCookies(['jwtToken']);
    const [cookie] = useCookies(['jwtToken']);
    const navigate = useNavigate();

    // Atualizar o estado da matrícula conforme o usuário digita,
    // aceita apenas números como entrada para a matrícula.

    const handleMatriculaChange = (event) => {
        const { value } = event.target;
        // Checa se o valor esta vazio ou se sao apenas numeros
        if (value === '' || /^\d+$/.test(value)) {
            setMatricula(value);
        }
    };
    useEffect(() => {
        document.title = 'Login';
        try {
            var cookieValue = document.cookie.split(';').map(cookie => cookie.split('=')).reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
            let token = cookieValue.jwtToken.toString();
            console.log(token);

            axios.post("http://18.209.49.236:3000/users/token", {
                token: token
            }).then(function (response) {
                if (!(response.data < 0)) {
                    navigate("/detail");
                }
            }).catch(function (error) {
                console.error(error);
            });
        } catch (err) {
            //console.error('Ocorreu um erro:', err);
        }

    }, []);

    // Atualizar o estado da senha conforme o usuário digita,

    const handleSenhaChange = (event) => {
        setSenha(event.target.value);
    };

    // Lidar com o envio do formulário de login, envia uma solicitação POST para 
    // o backend com matrícula e senha para autenticar o usuário.
    // Define um cookie de autenticação no navegador se as credenciais forem válidas.
    // Redireciona o usuário para a página "/detail" após o login bem-sucedido.
    // Exibe alertas de erro se a matrícula não existe ou a senha está incorreta.

    const handleSubmit = (event) => {
        event.preventDefault(); // previne que o usuário não mande o campo em branco
        // manda o que o usuário enviou nos campos, para o console
        console.log("Matrícula:", matricula);
        console.log("Senha:", senha);

        axios.post("http://18.209.49.236:3000/users/login", {
            matricula: matricula,
            senha: senha
        }).then(function (response) {
            if (response.data != 'MATRICULA INEXISTENTE' && response.data != 'SENHA INCORRETA') {
                setCookie('jwtToken', response.data, {
                    path: '/'
                });
                navigate("/detail");
            }

        }).catch(function (error) {
            console.log(error);
        });
    };

    return (
        <>
            <body id="paginaLogin">
                <div className='divC'>
                    <Link to="/">
                        <img className='img-setaLogin' src='/seta.svg' alt='seta' />
                    </Link>
                    <span className='title'>EDRA</span>
                    <span className='sub-title'>Entrar</span>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder='Matrícula'
                            value={matricula}
                            onChange={handleMatriculaChange}
                            pattern="[0-9]*"
                            maxLength={9}
                        />
                        <input
                            type="password"
                            placeholder='Senha'
                            value={senha}
                            onChange={handleSenhaChange}
                        />
                        <button type="submit"> ENTRAR</button>
                    </form>

                    <p><Link to="/passwordRecovery">Esqueci a senha</Link></p>
                </div>
            </body>
        </>
    );
}

export default Login;