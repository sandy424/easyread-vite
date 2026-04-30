import { useState } from "react";
import * as auth from '../api/auth.ts';
import { type UserPrivateQuestion } from "../api/types.ts";

const QUESTIONS: { value: UserPrivateQuestion; label: string }[] = [
  { value: "BEST_FRIEND", label: "가장 친한 친구의 이름은?" },
  { value: "BIRTH_CITY", label: "태어난 도시는?" },
  { value: "FIRST_PET", label: "첫 번째 반려동물의 이름은?" },
  { value: "FAVORITE_FRUIT", label: "가장 좋아하는 과일은?" },
  { value: "FAVORITE_TEACHER", label: "가장 좋아하는 선생님은? " },
];

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [privateQuestion, setPrivateQuestion] = useState<UserPrivateQuestion | "">("");
  const [privateAnswer, setPrivateAnswer] = useState("");
  const [formMsg, setFormMsg] = useState<{text: string; ok: boolean} | null>(null);
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async() => {
    setFormMsg(null);
    try{
        setIsLoading(true);
        console.log(username, password, privateAnswer, privateQuestion)
        const result = await auth.postSignup({
            username,
            password,
            private_question: privateQuestion,
            private_answer: privateAnswer,
        });
        console.log(result);
        setFormMsg({text: "가입이 완료되었습니다", ok: true});
    }catch (err) {
        setFormMsg({text: err.response.data.detail, ok: false});
    }finally{
        setIsLoading(false);
    }
  };

  return (
    <div className="bg-mint-10 w-full flex justify-center items-center scroll-hidden">
      <div className="border border-transparent bg-mint-50 rounded-2xl w-[480px] h-[650px] m-20 flex flex-col items-center p-8">
        <span className="text-teal-900 text-2xl font-semibold">EZREAD</span>
        <p className="text-teal-600 text-sm pt-3 font-medium">
          EZREAD에 오신 것을 환영합니다.
        </p>

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
          <select
            name="secretQuestion"
            value={privateQuestion}
            onChange={(e) => setPrivateQuestion(e.target.value as UserPrivateQuestion)}
            className="border border-transparent rounded-xl bg-white/70 w-96 h-10 pl-7 font-[700] text-sm text-gray-400"
          >
            <option value="">나만의 질문을 선택하세요</option>
            <option value="FAVORITE_FRUIT">가장 좋아하는 과일의 이름은?</option>
            <option value="BEST_FRIEND">가장 절친한 친구의 이름은?</option>
            <option value="FIRST_PET">처음 키운 반려동물의 이름은?</option>
            <option value="FAVORITE_TEACHER">가장 존경하는 선생님의 이름은?</option>
            <option value="BIRTH_CITY">태어난 도시는?</option>
          </select>
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
            {isLoading ? "처리 중..." : "가입하기"}
          </button>
        </form>

        {/* 폼 메시지 */}
        {formMsg && (
            <p style={{ textAlign: "center", fontSize: 13, margin: 8, color: formMsg.ok ? "#1D9E75" : "#E24B4A" }}>
                {formMsg.text}
            </p>
        )}
      </div>
    </div>
  );
}