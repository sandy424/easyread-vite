import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import * as log from '../api/usageLog.ts';
import type { UsageLogDetailResponse } from "../api/types";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';


export default function DetailPage() {

    const { id } = useParams<string>();
    console.log(id)

    const [usageLogDetail, setUsageLogDeatil] =useState<UsageLogDetailResponse>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUsageLogDetail = async() => {
            try{
                setIsLoading(true);
                const res = await log.getUsageLogDetail(id);
                setUsageLogDeatil(res);
            } catch (err) {
                console.log(err.response.detail.data);
            } finally {
                setIsLoading(false);
            }
        }
        fetchUsageLogDetail();
    },[])

    return(
        <div className="max-w-3xl mx-auto px-4 py-8 pt-16">
            {/* 헤더 카드 */}
            <div className="flex items-center gap-4 bg-white border border-mint-100 rounded-xl px-5 py-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-mint-50 flex items-center justify-center flex-shrink-0">
                
                </div>
                <div className="flex-1 min-w-0">
                <p className="text-base font-semibold text-mint-900 truncate">{usageLogDetail?.title}</p>
                <p className="text-xs text-mint-400">{usageLogDetail?.file_name} · {usageLogDetail?.created_at && new Date(usageLogDetail.created_at).toLocaleDateString('ko-KR')}</p>
                </div>
            </div>

            {/* 결과 카드 */}
            <div className="bg-white border border-mint-100 rounded-xl px-6 py-5">
                <p className="text-xs font-medium text-mint-400 uppercase tracking-widest mb-4">분석 결과</p>
                <div className="prose prose-sm max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {usageLogDetail?.compact_result ?? ''}
                </ReactMarkdown>
                </div>
            </div>
        </div>
    )
}