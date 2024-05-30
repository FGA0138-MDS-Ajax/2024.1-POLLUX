import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
    return (
        <header className='header'>
            <nav>
                <Link to="/login">
                <img src="edraV.svg" alt="edraV" />
                </Link>
                
                <Link to="/login">
                Login
                </Link>

                <Link to='/memberArea'>
                    Area de Membros
                </Link>

                <Link to='/documents'>
                    docs
                </Link>

            </nav>
            <span>EDRA.com</span>
        </header>

    )
}

export default Header
/*<nav>
<Link to="/login">
    <img src="edraV.svg" alt="edraV" />
</Link>

    <Link to="/login">Login</Link>
</nav>
<span>EDRA.com</span>*/