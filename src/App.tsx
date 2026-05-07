import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/HomePage';
import SignupForm from './pages/SignupFormPage';
import LoginForm from './pages/LoginFormPage';
import SignupSuccess from './pages/SignupSuccessPage';
import MyPage from './pages/MyPage';
import Header from './components/Header';
import DetailPage from './pages/DetailPage';

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path='/signup/success' element={<SignupSuccess />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/mypage/detail/:id' element={<DetailPage />} />
      </Routes> 
    </BrowserRouter>
  );
}