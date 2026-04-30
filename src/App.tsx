import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
}