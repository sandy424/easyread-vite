import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import SignupForm from './pages/SignupFormPage';
import LoginForm from './pages/LoginFormPage';
import SignupSuccess from './pages/SignupSuccessPage';
import MyPage from './pages/MyPage';
import DetailPage from './pages/DetailPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup/success" element={<SignupSuccess />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/detail/:id" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
