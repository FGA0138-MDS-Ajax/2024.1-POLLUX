import './SideBar.css'
import { Link } from 'react-router-dom'

function SideBar(){
    return(
        <sidebar className='sidebar'>
            <nav>
                <Link to='/meeting'>
                    <img src="meeting.png" alt="meeting"/>
                </Link>
                <Link to='/finance'>
                    <img src="finance.png" alt ="finance"/>
                </Link>
                <Link to='/storage'>
                    <img src="drone.png" alt="drone"/>
                </Link>
                <Link to='/memberarea'>
                    <img src="edraV.svg" alt="edraV"/>
                </Link>
                <Link to='/login'>
                    <img src="seta.svg" alt="voltar"/>
                </Link>
            </nav>
        </sidebar>
    )
}

export default SideBar