import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import SignupSuccess from './components/SignupSuccess';
import MyPage from './components/MyPage';
import Header from './components/Header';

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
      </Routes> 
    </BrowserRouter>
  );
}