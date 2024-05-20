import './Login.css'
import Bar from "../../components/Bar"
import { Link } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from '../../routes';
import CreateAccout from '../CreateAccount';

function Login(){
    return(
        < >   
        <body id="paginaLogin">
            <div className='divC'>
                <Link to="/">
                    <img className='img-setaLogin' src='/seta.svg' alt='seta' />
                </Link>
                <span className='title'>EDRA</span>        
                <span className='sub-title'>Entrar</span>
                <form>
                    <input type="text" placeholder='Matrícula' />
                    <input type="text" placeholder='Senha' />
                    <button> ENTRAR </button>
                </form>
                <p>Não possui conta? <a href='/createAccount'>Registrar-se</a></p>

            </div>
            </body>
        </>
    )
}

export default Login
