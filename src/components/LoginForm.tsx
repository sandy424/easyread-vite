import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import * as auth from '../api/auth.ts';
import { type PrivateQuestionAndLabel, type UserPrivateQuestion } from "../api/types.ts";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [privateQuestions, setPrivateQuestions] = useState<PrivateQuestionAndLabel[]>([]);
  const [privateQuestion, setPrivateQuestion] = useState<UserPrivateQuestion | "">("");
  const [privateAnswer, setPrivateAnswer] = useState("");
  const [formMsg, setFormMsg] = useState<{alert: string; ok: boolean} | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // 처음 렌더링할 때마다 나만의 질문 목록을 받아온다.
  useEffect(() => {
    const fetchPrivateQuestions = async() => {
      setIsLoading(true);
      
      try {
        const data: PrivateQuestionAndLabel[] = await auth.getPrivateQuestion();
        console.log(data)
        setPrivateQuestions(data);
    
      } catch (err) {
        console.log(err.response.data.detail);
      } finally {
        setIsLoading(false);
      }
      
    }
    fetchPrivateQuestions();
  },[])

  // 로그인폼 제출 버튼 함수
  const handleSubmit = async() => {
    try{
        setIsLoading(true);

        const result = await auth.postLogin({
            username,
            password,
            private_answer: privateAnswer,
        });
        localStorage.setItem('accessToken', result.access_token);
        console.log(result);
        navigate('/');
    }catch (err) {
        setFormMsg({alert: err.response.data.detail , ok: false});
    }finally{
        setIsLoading(false);
    }
  };

  return (
    <div className="bg-mint-10 w-full min-h-screen flex justify-center items-center scroll-hidden">
      <div className="border border-transparent bg-mint-50 rounded-2xl w-[480px] h-[600px] m-20 flex flex-col items-center p-8">
        <span className="text-teal-900 text-2xl font-semibold">
          <Link to={"/"}>EZREAD</Link>
        </span>

        <form onSubmit={handleSubmit} className="flex flex-col gap-10 pt-16">
          <input
            type="text"
            name="username"
            autoComplete="username"
            placeholder="아이디"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-transparent rounded-xl bg-white/70 w-96 h-10 pl-7 font-[700] text-sm"
          />
          <input
            type="password"
            name="password"
            autoComplete="password"
            placeholder="6자 이상의 비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-transparent rounded-xl bg-white/70 w-96 h-10 pl-7 font-[700] text-sm"
          />
          
          {
              privateQuestions.length > 0 && (
              <select
                name="secretQuestion"
                value={privateQuestion}
                onChange={(e) => setPrivateQuestion(e.target.value as UserPrivateQuestion)}
                className="border border-transparent rounded-xl bg-white/70 w-96 h-10 pl-7 font-[700] text-sm text-gray-400"
              >
                <option value="">나만의 질문을 선택하세요</option>
                <option value={privateQuestions[0].value}>{privateQuestions[0].label}</option>
                <option value={privateQuestions[1].value}>{privateQuestions[1].label}</option>
                <option value={privateQuestions[2].value}>{privateQuestions[2].label}</option>
                <option value={privateQuestions[3].value}>{privateQuestions[3].label}</option>
                <option value={privateQuestions[4].value}>{privateQuestions[4].label}</option>
              </select>     
              )
          }

          <input
            type="text"
            name="secretAnswer"
            placeholder="나만의 질문에 대한 답을 적으세요"
            value={privateAnswer}
            onChange={(e) => setPrivateAnswer(e.target.value)}
            className="border border-transparent rounded-xl bg-white/70 w-96 h-10 pl-7 font-[700] text-sm"
          />

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-6 py-2 border border-transparent bg-mint-100 rounded-lg text-mint-900 font-semibold text-base cursor-pointer hover:bg-mint-600 self-center"
          >
            {isLoading ? "처리 중..." : "로그인"}
          </button>
        </form>
        {/* 폼 메시지 */}
        {formMsg && (
            <p style={{ textAlign: "center", fontSize: 13, margin: 8, color: formMsg.ok ? "#1D9E75" : "#E24B4A" }}>
                {formMsg.alert}
            </p>
        )}

        <div className="flex text-xs pt-10">
          <span>아직 계정이 없으신가요?</span>
          <span className="text-teal-900 mx-3">|</span>
          <a href="/signup" className="text-teal-700 font-semibold">회원가입하러 가기</a>
        </div>
      </div>
    </div>
  );
}