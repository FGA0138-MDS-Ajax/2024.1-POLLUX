import './SideBar.css'
import { Link } from 'react-router-dom'

function SideBar(){
    return(
        <sidebar className='sidebar'>
            <nav>
            <Link to='/calendar'>
                <img src="calendario.svg" alt="img-calendario"/>
                </Link>

                <Link to='/storage'>
                    <img src="estoque.svg" alt="img-estoque"/>
                </Link>
                
                <Link to='/meeting'>
                    <img src="reuniao.svg" alt="img-reuniao"/>
                </Link>

                <Link to='/documents'>
                    <img src="documentos.svg" alt="img-documentos"/>
                </Link>

                <Link to='/finance'>
                    <img src="financeiro.svg" alt ="img-finance"/>
                </Link>
                </nav>

                <nav className="embaixo">
                <Link to='/'>
                    <img src="logout.svg" alt="logout" class="sidebar-image img-logout"/>
                </Link>

                <Link to='/memberarea'>
                    <img src="edraV.svg" alt="edraV"/>
                </Link>
                </nav>

        </sidebar>
    )
}

export default SideBar