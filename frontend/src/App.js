import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandPage from './pages/LandPage';
import UserMain from './pages/UserMain';
import UserProfile from './pages/UserProfile';
import AdminMain from './pages/AdminMain';
import UserForm from './pages/UserForm';
import LoginForm from './pages/LoginForm';
import ChangePass from './pages/ChangePass';
import AdminForm from './pages/AdminForm';
import { AppProvider } from './utils/Context';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<LandPage/>}/>
            <Route path='/userPage' element={<UserMain/>}/>
            <Route path='/userProfile' element={<UserProfile/>}/>
            <Route path='/adminPage' element={<AdminMain/>}/>
            <Route path='/userForm' element={<UserForm/>}/>
            <Route path='/loginForm' element={<LoginForm/>}/>
            <Route path='/changePass' element={<ChangePass/>}/>
            <Route path='/adminForm' element={<AdminForm/>}/>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
