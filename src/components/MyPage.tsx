import { useEffect, useState } from "react";
import type { UsageLogResponse, UserInfoResponse } from "../api/types";
import * as log from '../api/usageLog.ts';
import * as auth from '../api/auth.ts';
import { Link, useNavigate } from "react-router-dom";

export default function MyPage() {

    const [usageLog, setUsageLog] = useState<UsageLogResponse[]>([]);
    const [userInfo, setUserInfo] = useState<UserInfoResponse>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();

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
        const fetchUserInfo = async() => {
            try {
                setIsLoading(true);
                const res = await auth.getUserInfo();
                setUserInfo(res);
            } catch(err) {
                console.log(err.response.detail.data);
            } finally {
                setIsLoading(false);
            }
        }
        fetchUserInfo();
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
    
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        setUserInfo(undefined);
        navigate('/');
    }

    return(
        <div className="bg-mint-50 w-full min-h-screen flex flex-col items-center font-ko">
            {/* 헤더 - 이거를 계속 사용할지, 분리할지 */}
            <header className="flex items-center justify-between h-14 px-6 fixed top-0 left-0 right-0 bg-white border-b border-mint-100 z-50">
                <div className="flex-1"></div>

                <Link to='/' className="text-2xl font-semibold font-en text-mint-900 text-center whitespace-nowrap">
                    EZREAD
                </Link>
                
                <nav className="flex-1 flex items-center justify-end text-sm text-mint-600">
                    { userInfo ? (
                        <div className="flex gap-10 pr-36 whitespace-nowrap">
                            <span className="hidden lg:inline">
                                안녕하세요, <span className="text-mint-900 font-bold">{userInfo?.username}</span> 님
                            </span>
                            <Link to='/mypage' className="hover:text-mint-900 transition-colors">
                                마이페이지
                            </Link>
                            <button onClick={handleLogout} className="hover:text-mint-900 transition-colors">
                                로그아웃
                            </button>
                        </div>
                        ) : (
                        <div className="flex gap-4 md:gap-8 whitespace-nowrap">
                            <Link to="/login" className="hover:text-mint-900 transition-colors">
                                로그인
                            </Link>
                            <Link to="/signup" className="hover:text-mint-900 transition-colors">
                                회원가입
                            </Link>
                        </div>
                    )}
                </nav>
            </header>

            {/* 회원 정보 */}
            <div>   
                
            </div>

            {/* 변환 기록 카드 상자 */}
            <div className="flex flex-col gap-5 pt-40 px-4 max-w-2xl mx-auto w-full">
                <div className="flex gap-3 items-center">
                    <span className="text-sm text-mint-600">최근 변환 기록</span>
                    {/* 변환 기록 개수 표시 */}
                    <div className="border border-transparent rounded-3xl bg-mint-600 w-10 h-6 flex items-center justify-center">
                        <span className="text-white">{usageLog.length}</span>
                    </div>
                </div>
                {usageLog.length === 0 ? (
                    <div className="flex items-center justify-center py-16 text-mint-400 text-sm">
                        사용 기록이 없습니다.
                    </div>
                ) : (
                    usageLog.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center gap-4 bg-white border border-mint-100 rounded-xl px-5 py-4 hover:border-mint-300 transition-colors cursor-pointer"
                        >
                            {/* 아이콘 */}
                            <div className="w-10 h-10 rounded-lg bg-mint-50 flex items-center justify-center flex-shrink-0">
                                <svg xmlns="/fileName.svg" className="w-5 h-5 text-mint-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>

                            {/* 제목 + 파일 이름 */}
                            <div className="flex flex-col flex-1 min-w-0">
                                <span className="text-sm font-medium text-mint-900 truncate">{item.title}</span>
                                <span className="text-xs text-mint-400 truncate">{item.file_name}</span>
                            </div>

                            {/* 날짜 */}
                            <span className="text-xs text-mint-400 flex-shrink-0">
                                {new Date(item.created_at).toLocaleDateString('ko-KR')}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}