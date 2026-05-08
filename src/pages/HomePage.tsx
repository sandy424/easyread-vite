import { useNavigate } from "react-router-dom";

export default function HomePage() {

  const navigate = useNavigate();
  return (
    <div className="bg-mint-50 w-full min-h-screen flex justify-center font-ko pt-14">
      <div className="text-center px-6 pt-10 pb-16">
        <span className="inline-block bg-mint-100/75 text-mint-600 text-base font-medium px-4 py-1.5 rounded-full mb-10">
          읽기 어려웠던 글, 이제 괜찮아요
        </span>
      
        <h1 className="text-4xl font-medium text-mint-900 mb-10">
          어려운 글을 <br />
          <span className="text-mint-600">쉽게 바꿔드려요</span>
        </h1>

        <div className="flex gap-8 mb-10">
          <div className="border border-teal-600 rounded-2xl p-4 mt-8 w-40 bg-white flex flex-col items-center justify-center">
            <img src="/announce.png" alt="공지사항" className="w-8 h-8" />
            <span className="text-base font-Regular mt-1">안내문</span>
          </div>
          <div className="border border-teal-600 rounded-2xl p-4 mt-8 w-40 bg-white flex flex-col items-center justify-center">
            <img src="/notice.png" alt="공지사항" className="w-8 h-8" />
            <span className="text-base font-Regular mt-1">공지사항</span>
          </div>
          <div className="border border-teal-600 rounded-2xl p-4 mt-8 w-40 bg-white flex flex-col items-center justify-center">
            <img src="/contract.png" alt="계약서" className="w-8 h-8" />
            <span className="text-base font-Regular mt-1">계약서</span>
          </div>
          <div className="border border-teal-600 rounded-2xl p-4 mt-8 w-40 bg-white flex flex-col items-center justify-center">
            <img src="/exam.png" alt="시험지" className="w-8 h-8" />
            <span className="text-base font-Regular mt-1">시험지</span>
          </div>
        </div>
        <p className="text-mint-500 text-lg leading-loose mb-32">
          사진이나 파일을 올리면 <br />
          짧고 쉬운 말로 다시 써드려요. <br />
          천천히 읽어도 돼요.
        </p>

        {/* 로그인 버튼 / 회원가입 */}
        <div className="flex gap-10 flex-wrap justify-center mb-28">
          <button onClick={() => navigate('/login')}
            className="bg-mint-550 text-white text-base font-medium px-6 py-3 rounded-xl hover:bg-mint-600">
            로그인하고 시작하기
          </button>
          <button onClick={() => navigate('/signup')}
            className="bg-transparent border border-mint-500 text-mint-550 text-base font-medium px-6 py-3 rounded-xl hover:bg-mint-600 hover:text-white">
            처음이에요 - 가입하기
          </button>
        </div>

        <div className="h-px bg-mint-100 mx-6" />

        {/* 이용 방법 */}
        <section className="max-w-xl mx-auto px-6 py-14">
          <p className="text-2xl font-medium text-mint-900 mb-8">이렇게 쓰면 돼요</p>
          <div className="flex flex-col gap-5">
            {[
              { num: '1', title: '사진이나 파일을 올려요', desc: '읽기 어려운 글이 담긴 사진이나 PDF를 올려요' },
              { num: '2', title: '잠깐 기다려요', desc: 'EZREAD가 글을 읽고 쉽게 바꿔요. 조금 걸릴 수 있어요' },
              { num: '3', title: '쉬운 글로 확인해요', desc: '짧고 쉬운 말로 바뀐 글을 읽어요. 언제든지 다시 볼 수 있어요' },
            ].map((s) => (
              <div key={s.num} className="bg-white border border-mint-100 rounded-xl px-8 py-6 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-mint-50 text-mint-600 text-base font-medium flex items-center justify-center flex-shrink-0">
                  {s.num}
                </div>
                <div className="flex-1 text-center">
                  <p className="text-lg font-medium text-mint-900 mb-0.5">{s.title}</p>
                  <p className="text-base text-mint-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
