import { useState } from "react";
import * as auth from "../api/auth.ts";
import { type UserPrivateQuestion } from "../api/types.ts";
import type { AxiosError } from "axios";


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
  const [formMsg, setFormMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setFormMsg(null);

    try {
      setIsLoading(true);
      console.log(username, password, privateAnswer, privateQuestion)
      const result = await auth.postSignup({
        username,
        password,
        private_question: privateQuestion,
        private_answer: privateAnswer,
      });
      console.log(result);
      setFormMsg({ text: "가입이 완료되었습니다!", ok: true });
    } catch (err) {
      setFormMsg({ text: err.response.data.detail, ok: false });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "2rem auto", padding: "0 1rem" }}>
      {/* 헤더 */}
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ fontSize: 13, color: "#888", margin: "0 0 4px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          시작하기
        </p>
        <h1 style={{ fontSize: 24, fontWeight: 500, margin: 0 }}>회원가입</h1>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {/* 아이디 */}
        <div>
          <label style={{ display: "block", fontSize: 13, color: "#666", marginBottom: 6 }}>
            아이디
          </label>
          <input
            type="text"
            placeholder="사용할 아이디를 입력하세요"
            value={username}
            onChange={(e) =>  setUsername(e.target.value)}
            style={{ width: "100%", boxSizing: "border-box" }}
          />
        </div>

        {/* 비밀번호 */}
        <div>
          <label style={{ display: "block", fontSize: 13, color: "#666", marginBottom: 6 }}>
            비밀번호
          </label>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", boxSizing: "border-box" }}
          />
        </div>

        {/* 비밀 질문 */}
        <div>
          <label style={{ display: "block", fontSize: 13, color: "#666", marginBottom: 6 }}>
            비밀 질문
          </label>
          <select
            value={privateQuestion}
            onChange={(e) => setPrivateQuestion(e.target.value as UserPrivateQuestion)}
            style={{ width: "100%", boxSizing: "border-box" }}
          >
            <option value="">질문을 선택하세요</option>
            {QUESTIONS.map((q) => (
              <option key={q.value} value={q.value}>
                {q.label}
              </option>
            ))}
          </select>
        </div>

        {/* 비밀 답변 */}
        <div>
          <label style={{ display: "block", fontSize: 13, color: "#666", marginBottom: 6 }}>
            비밀 답변
          </label>
          <input
            type="text"
            placeholder="답변을 입력하세요"
            value={privateAnswer}
            onChange={(e) => setPrivateAnswer(e.target.value)}
            style={{ width: "100%", boxSizing: "border-box" }}
          />
        </div>

        {/* 제출 버튼 */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          style={{
            width: "100%",
            marginTop: "0.5rem",
            padding: "10px",
            fontSize: 14,
            fontWeight: 500,
            background: "#111",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.6 : 1,
            transition: "opacity 0.15s",
          }}
        >
          {isLoading ? "처리 중..." : "가입하기"}
        </button>

        {/* 폼 메시지 */}
        {formMsg && (
          <p style={{ textAlign: "center", fontSize: 13, margin: 0, color: formMsg.ok ? "#1D9E75" : "#E24B4A" }}>
            {formMsg.text}
          </p>
        )}
      </div>
    </div>
  );
}