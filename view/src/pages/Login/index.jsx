import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import axios from 'axios'


function Login() {
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');

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

     try {
    const response = axios.post("http://localhost:3000/users/login", {
      matricula: matricula,
      senha: senha
    });
    console.log(response.data);
  } catch (error) {
    throw error;
  }    

    

    

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
