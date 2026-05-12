import { useEffect, useState } from 'react';
import type { UsageLogResponse } from '../api/types.ts';
import * as log from '../api/usageLog.ts';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.tsx';

export default function MyPage() {
  const [usageLog, setUsageLog] = useState<UsageLogResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState(false);


  const navitgate = useNavigate();

  // 변환 기록들 불러오기
  useEffect(() => {
    const fetchUsageLog = async () => {
      try {
        setIsLoading(true);
        const res = await log.getUsageLog();
        setUsageLog(res);
        console.log(res);
      } catch (err) {
        console.log(err.response.detail.data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsageLog();
  }, []);

  // 기록 삭제 기능 추가
  const handleDelete = async (id: string) => {
    // confirm으로 팝업 띄우기
    const ok = window.confirm('이 기록을 삭제할까요?');
    if (!ok) return;

    try {
      // 삭제 api 호출
      await log.deleteUsageLog(id);
      // 현재 목록에서 삭제한 id만 제거
      setUsageLog((prev) => prev.filter((item) => String(item.id) !== id));
    } catch (err) {
      console.error(err);
    }
  }

  if (isLoading) {
    return (
      <div className="bg-mint-50 w-full min-h-screen flex flex-col items-center justify-center font-ko">
        <span>로딩 중...</span>
      </div>
    );
  }

  if (!usageLog) {
    return (
      <div className="bg-mint-50 w-full min-h-screen flex flex-col items-center justify-center font-ko">
        <span>데이터가 없습니다</span>
      </div>
    );
  }

  return (
    <div className="bg-mint-50 w-full min-h-screen flex flex-col items-center font-ko">

      <Header />

      {/* 변환 기록 카드 상자 */}
      <div className="flex flex-col gap-5 py-36 px-4 max-w-2xl mx-auto w-full">
        <div className="flex items-center justify-between px-2">
          <div className="flex gap-3 items-center">
            <span className="text-sm font-bold text-mint-600">최근 변환 기록</span>

            {/* 변환 기록 개수 표시 */}
            <div className="border border-transparent rounded-3xl bg-mint-600 w-10 h-6 flex items-center justify-center">
              <span className="text-white">{usageLog.length}</span>
            </div>
          </div>
        </div>

        {/* 변환 기록 리스트 */}
        {usageLog.length === 0 ? (
          <div className="flex items-center justify-center py-16 text-mint-400 text-sm">
            사용 기록이 없습니다.
          </div>
        ) : (
          usageLog.map((item) => (
            <div
              key={item.id}
              // DetailPage로 이동
              onClick={() => navitgate(`/mypage/detail/${item.id}`)}
              className="flex items-center gap-4 bg-white border border-mint-100 rounded-xl px-5 py-4 hover:border-mint-300 transition-colors cursor-pointer"
            >
              {/* 아이콘 */}
              <div className="w-12 h-12 rounded-lg bg-mint-50 flex items-center justify-center flex-shrink-0">
                <svg
                  xmlns="/fileName.svg"
                  className="w-8 h-8 text-mint-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>

              {/* 제목 + 파일 이름 */}
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <span className="text-base font-semibold text-mint-900 truncate">{item.title}</span>
                <span className="text-xs text-mint-400 truncate">{item.file_name}</span>
              </div>

              {/* 날짜 */}
              <span className="text-xs text-mint-400 flex-shrink-0">
                {/* 날짜를 문자열로 변환 */}
                {new Date(item.created_at).toLocaleDateString('ko-KR')}
              </span>

              {/* 삭제 버튼 */}
              <button
              onClick={(e) => {
                // 부모한테 전달 차단 => 상세페이지로 이동 못 하게 함.
                e.stopPropagation();
                handleDelete(String(item.id));
              }}
              className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
