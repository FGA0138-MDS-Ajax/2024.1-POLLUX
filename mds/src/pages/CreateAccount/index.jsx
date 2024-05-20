import './CreateAccount.css'
import { Link } from 'react-router-dom'

function CreateAccout(){
    return(
        <>
        <body id='paginaCreateAccount'>
            <div className='divC'>
                <Link to="/">
                    <img className='img-setaCreat' src='/seta.svg' alt='seta' />
                </Link>
                <span className='title'>EDRA</span>
                <span className='sub-title'>Registro</span>
                <form>
                    <input type="text" placeholder='Nome' />
                    <input type="text" placeholder='Matrícula' />
                    <input type="text" placeholder='Senha' />
                    <input type="text" placeholder='Confirmar Senha' />
                    <button> CRIAR CONTA </button>
                </form>
                <p>Já tem conta? <a href='/login'>Entrar</a></p>
            </div>
        </body>
        </>
    )
}

export default CreateAccout
