import { api } from "./instance.ts";
import type { UsageLogUpdateRequest } from "./types";

// 이미지 or PDF 업로드 → OCR → 단순화 → 저장 post 요청
export async function postUpLoad() {
    const response = await api.post("/usage-logs");
    return(response.data)
}

// 사용 기록 목록 조회 get 요청
export async function getUsageLog() {
    const response = await api.get("/usage-logs");
    return(response.data)
}

// 사용 기록 목록 상세 get 요청
export async function getUsageLogDetail(log_id:string, body: UsageLogUpdateRequest) {
    const response = await api.get(`/usage-logs/${log_id}`, { params: body });
    return(response.data)
}

// 기록 제목 수정
export async function updateUsageLog(log_id:string) {
    const response = await api.patch(`/usage-logs/${log_id}`);
    return(response.data)
}

// 기록 삭제
export async function deleteUsageLog(log_id:string) {
    const response = await api.delete(`/usage-logs/${log_id}`);
    return(response.data)
}