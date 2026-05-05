import { useEffect, useState } from "react";
import type { UsageLogResponse } from "../api/types";
import * as log from '../api/usageLog.ts';

export default function MyPage() {

    const [usageLog, setUsageLog] = useState<UsageLogResponse>();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchUsageLog = async() => {
            try{
                setIsLoading(true);
                const res= await log.getUsageLog();
                setUsageLog(res);
            } catch(err) {
                console.log(err.response.detail.data);
            } finally {
                setIsLoading(false);
            }
        }
        fetchUsageLog();
    },[]);

    return(
        <div>

        </div>
    )
}