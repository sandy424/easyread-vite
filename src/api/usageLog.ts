import api from "./instance";
import type { UsageLogUpdateRequest } from "./types";

// 사용 기록 목록 get 요청
export async function getUsageLog() {
    try{
        const response = await api.get("/usage-logs");
        return(response.data)
    }catch(error){
        return(error);
    }
}

// 사용 기록 목록 상세 get 요청
export async function getUsageLogDetail(log_id:string, body: UsageLogUpdateRequest) {
    try{
        const response = await api.get(`/usage-logs/${log_id}`, { params: body });
        return(response.data)
    }catch(error){
        return(error);
    }
}

// 기록 제목 수정
export async function updateUsageLog(log_id:string) {
    try{
        const response = await api.patch(`/usage-logs/${log_id}`);
        return(response.data)
    }catch(error){
        return(error);
    }
}

// 기록 삭제
export async function deleteUsageLog(log_id:string) {
    try{
        const response = await api.delete(`/usage-logs/${log_id}`);
        return(response.data)
    }catch(error){
        return(error);
    }
}