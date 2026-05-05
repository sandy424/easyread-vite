import { useEffect, useState } from "react";
import type { UsageLogResponse, UserInfoResponse } from "../api/types";
import * as log from '../api/usageLog.ts';
import * as auth from '../api/auth.ts';
import { Link, useNavigate } from "react-router-dom";

export default function MyPage() {

    const [usageLog, setUsageLog] = useState<UsageLogResponse>();
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
            <header className="flex items-center justify-between h-14 px-6 fixed top-0 left-0 right-0 bg-white border-b border-mint-100 z-50">
                <div className="w-24"></div>

                <Link to='/' className="text-2xl font-semibold font-en text-mint-900 text-center">
                    EZREAD
                </Link>
                
                <nav className="flex items-center justify-end text-sm text-mint-600">
                    { userInfo ? (
                        <div className="flex gap-10 pr-36">
                        <span>
                            안녕하세요, <span className="text-mint-900 font-bold">{userInfo?.username}</span>님
                        </span>
                        <Link to='/mypage' className="hover:text-mint-900 transition-colors">
                            마이페이지
                        </Link>
                        <button onClick={handleLogout} className="hover:text-mint-900 transition-colors">
                            로그아웃
                        </button>
                        </div>
                    ) : (
                        <div className="flex gap-10 pr-36">
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
            {Array.isArray(usageLog) ? (
                <div className="pt-20">
                    {usageLog.map((item) => (
                        <div key={item.id}>
                            <span>{item.title}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <span>{usageLog.title}</span>
            )}
        </div>
    )
}