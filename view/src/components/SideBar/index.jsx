/* 
   Componente SideBar para navegação lateral da aplicação dentro do 
   sistema de gerenciamento. Inclui links para diferentes páginas 
   usando o componente Link do react-router-dom e funcionalidade de logout.
*/

import './SideBar.css';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// Função para realizar logout, limpando o token JWT do cookie

function logOut() {
    document.cookie = `jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

function SideBar() {
    return (
        <div className='sidebar'>
            <div className='sidebar-top'>
                <nav>
                    <Link to='/calendar'>
                        <img src="calendario.svg" alt="img-calendario" />
                    </Link>
                    <Link to='/storage'>
                        <img src="estoque.svg" alt="img-estoque" />
                    </Link>
                    <Link to='/meeting'>
                        <img src="reuniao.svg" alt="img-reuniao" />
                    </Link>
                    <Link to='/documents'>
                        <img src="documentos.svg" alt="img-documentos" />
                    </Link>
                    <Link to='/finance'>
                        <img src="financeiro.svg" alt="img-finance" />
                    </Link>
                </nav>
            </div>
            <div className='sidebar-bottom'>
                <nav className="embaixo">
                    <Link to='/' onClick={() => { logOut(); document.title = 'EDRA' }}>
                        <img src="logout.svg" alt="logout" className="sidebar-image img-logout" />
                    </Link>
                    <Link to='/detail'>
                        <img src="edraV.svg" alt="edraV" />
                    </Link>
                </nav>
            </div>
        </div>
    );
}

export default SideBar;
