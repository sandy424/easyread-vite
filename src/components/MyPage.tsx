import { useEffect, useState } from "react";
import type { UsageLogResponse } from "../api/types";
import * as log from '../api/usageLog.ts';
import { useNavigate } from "react-router-dom";

export default function MyPage() {

    const [usageLog, setUsageLog] = useState<UsageLogResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navitgate = useNavigate();

    // 변환 기록들 불러오기
    useEffect(() => {
        const fetchUsageLog = async() => {
            try{
                setIsLoading(true);
                const res= await log.getUsageLog();
                setUsageLog(res);
                console.log(res);
            } catch(err) {
                console.log(err.response.detail.data);
            } finally {
                setIsLoading(false);
            }
        }
        fetchUsageLog();
    },[]);
    
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

    return(
        <div className="bg-mint-50 w-full min-h-screen flex flex-col items-center font-ko">
            {/* 회원 정보 */}
            <div>   
                
            </div>

            {/* 변환 기록 카드 상자 */}
            <div className="flex flex-col gap-5 pt-40 px-4 max-w-2xl mx-auto w-full">
                
                <div className="flex items-center justify-between px-2">
                    <div className="flex gap-3 items-center">
                        <span className="text-sm font-bold text-mint-600">최근 변환 기록</span>

                        {/* 변환 기록 개수 표시 */}
                        <div className="border border-transparent rounded-3xl bg-mint-600 w-10 h-6 flex items-center justify-center">
                            <span className="text-white">{usageLog.length}</span>
                        </div>
                    </div>
                    
                    {/* 삭제 버튼 */}
                    <button className="flex items-center gap-1.5 text-sm text-red-400 border border-red-300 rounded-full px-4 py-1.5 hover:bg-red-50 transition-colors">
                        삭제하기
                    </button>
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
                            onClick={() => navitgate(`/mypage/detail/${item.id}`)}
                            className="flex items-center gap-4 bg-white border border-mint-100 rounded-xl px-5 py-4 hover:border-mint-300 transition-colors cursor-pointer">
                            
                            {/* 아이콘 */}
                            <div className="w-12 h-12 rounded-lg bg-mint-50 flex items-center justify-center flex-shrink-0">
                                <svg xmlns="/fileName.svg" className="w-8 h-8 text-mint-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}