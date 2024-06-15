import React, { useState } from 'react';
import './Login.css';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios'
import Cookies from 'universal-cookie';

function Login() {
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');
    const cookies = new Cookies();
    const handleMatriculaChange = (event) => {
        const { value } = event.target;
        // Checa se o valor esta vazio ou se sao apenas numeros
        if (value === '' || /^\d+$/.test(value)) {
            setMatricula(value);
        }
    };


    const handleSenhaChange = (event) => {
        setSenha(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // previne que o usuário não mande o campo em branco
        // manda o que o usuário enviou nos campos, para o console
        console.log("Matrícula:", matricula);
        console.log("Senha:", senha);

        axios.post("http://localhost:3000/users/login", {
            matricula: matricula,
            senha: senha
        }).then(function (response) {
            console.log(response.data);
            cookies.set('jwtToken', response.data, {
                path: '/',
                secure: true,
                sameSite: 'None'
            });
            <Navigate to="/details" />
        }).catch(function (error) {
            console.log(error);
        });

        //window.location.href = '/detail';


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
