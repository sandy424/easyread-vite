import { useLocation, useNavigate } from "react-router-dom";
export default function SignupSuccess() {

    const { state } = useLocation();
    const navigate = useNavigate();
  
    const user = state?.user; 

    return (
        <div className="success-wrap">
            <div className="card">
                <div className="icon-wrap">✓</div>
                <span className="name-badge">{user?.username + user?.test} 님</span>
                <h1>가입 완료!</h1>
                <p>환영해요 🌿 이제 모든 서비스를 이용할 수 있어요</p>
            </div>

            <button onClick={() => navigate('/login')}>시작하기 →</button>
        </div>
    );
}