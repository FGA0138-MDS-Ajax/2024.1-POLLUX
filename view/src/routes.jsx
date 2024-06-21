import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Divulgation from './pages/Divulgation'
import Login from './pages/Login'
import PasswordRecovery from './pages/PasswordRecovery'
import CreateAccout from './pages/CreateAccount'
import Detail from './pages/Detail'
import Meeting from './pages/Meeting'
import Finance from './pages/Finance'
import Storage from './pages/Storage'
import Documents from './pages/Documents'
import Admin from './pages/Admin'
import './App.css'
import Calendar from './pages/Calendar'
import NewPassword from './pages/NewPassword'

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Divulgation />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/createAccount' element={<CreateAccout />} />
                <Route path='/passwordRecovery' element={<PasswordRecovery />} />
                <Route path='/detail' element={<Detail />}></Route>
                <Route path='/meeting' element={<Meeting />}></Route>
                <Route path='/finance' element={<Finance />}></Route>
                <Route path='/storage' element={<Storage />}></Route>
                <Route path='/documents' element={<Documents />}></Route>
                <Route path='/admin' element={<Admin />}></Route>
                <Route path='/calendar' element={<Calendar />}></Route>
                <Route path='/newPassword' element={<NewPassword />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
