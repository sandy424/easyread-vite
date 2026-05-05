import { useEffect, useState } from "react";
import type { UsageLogResponse } from "../api/types";
import * as log from '../api/usageLog.ts';

export default function MyPage() {

    const [usageLog, setUsageLog] = useState<UsageLogResponse>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

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

    if (error) {
        return (
            <div className="bg-mint-50 w-full min-h-screen flex flex-col items-center justify-center font-ko">
                <span className="text-red-500">오류: {error}</span>
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
            {Array.isArray(usageLog) ? (
                <div>
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