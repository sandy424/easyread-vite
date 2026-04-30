import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import SignupSuccess from './components/SignupSuccess';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path='/signup/success' element={<SignupSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}