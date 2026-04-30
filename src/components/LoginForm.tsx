import { useEffect, useState } from "react";
import * as auth from '../api/auth.ts';
import { type PrivateQuestionAndLabel, type UserPrivateQuestion } from "../api/types.ts";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [privateQuestion, setPrivateQuestion] = useState<UserPrivateQuestion | "">("");
  const [privateAnswer, setPrivateAnswer] = useState("");
  const [privateQuestions, setPrivateQuestions] = useState<PrivateQuestionAndLabel[]>([]);

  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async() => {
    try{
        setIsLoading(true);
        console.log(username, password, privateAnswer, privateQuestion)
        const result = await auth.postLogin({
            username,
            password,
            private_answer: privateAnswer,
        });
        localStorage.setItem('accessToken', result.access_token);
        console.log(result);
    }catch (err) {
        
    }finally{
        setIsLoading(false);
    }
  };

  return (
    <div className="bg-mint-10 w-full flex justify-center items-center scroll-hidden">
      <div className="border border-transparent bg-mint-50 rounded-2xl w-[480px] h-[600px] m-20 flex flex-col items-center p-8">
        <span className="text-teal-900 text-2xl font-semibold">EZREAD</span>

        <form onSubmit={handleSubmit} className="flex flex-col gap-10 pt-16">
          <input
            type="text"
            name="username"
            placeholder="아이디"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-transparent rounded-xl bg-white/70 w-96 h-10 pl-7 font-[700] text-sm"
          />
          <input
            type="password"
            name="password"
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
            className="px-6 py-2 border border-transparent bg-mint-100 rounded-lg text-mint-900 font-semibold text-base cursor-pointer hover:bg-mint-600 mt-8 self-center"
          >
            {isLoading ? "처리 중..." : "로그인"}
          </button>
        </form>
        
      </div>
    </div>
  );
}