import { useLocation, useNavigate } from 'react-router-dom';

export default function SignupSuccessPage() {
  const location = useLocation();
  const { username } = location.state;

  const navigate = useNavigate();

  return (
    <div className="bg-mint-10 w-full min-h-screen flex flex-col gap-12 justify-center items-center scroll-hidden">
      <img src="/signupSuccess.svg" alt="성공" className="w-100 h-100 pb-12" />
      <span className="text-lg font-medium">{username} 님</span>
      <h1 className="text-mint-900 font-bold text-3xl">가입 완료!</h1>
      <button
        onClick={() => navigate('/login')}
        className="hover:text-mint-600 text-mint-500 font-extrabold text-2xl"
      >
        시작하기 →
      </button>
    </div>
  );
}
