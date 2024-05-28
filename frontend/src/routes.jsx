import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Divulgation from './pages/Divulgation'
import Login from './pages/Login'
import PasswordRecovery from './pages/PasswordRecovery'
import CreateAccout from './pages/CreateAccount'
import MemberArea from './pages/MemberArea'
import Meeting from './pages/Meeting'
import Finance from './pages/Finance'
import Storage from './pages/Storage'
import './App.css'

function AppRoutes() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Divulgation />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/createAccount' element={<CreateAccout />}/>
                <Route path='/passwordRecovery' element={<PasswordRecovery />}/>
                <Route path='/memberArea' element={<MemberArea/>}></Route>
                <Route path='/meeting' element={<Meeting/>}></Route>
                <Route path='/finance' element={<Finance/>}></Route>
                <Route path='/storage' element={<Storage/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
