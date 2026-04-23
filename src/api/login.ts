import api from './instance';

// 회원가입 post 요청
export async function postSignup() {
    try{
        const response = await api.post("/auth/signup");
        return(response);
    }catch(error){
        return(error);
    }
}

// 로그인 post 요청
export async function postLogin() {
    try{
        const response = await api.post("/auth/login");
        return(response);
    }catch(error){
        return(error);
    }
}

// 내 정보 조회 get 요청
export async function getUserInfo() {
    try{
        const response = await api.get("/auth/me");
        return(response.data);
    }catch(error){
        return(error);
    }
}

// 사용 기록 목록 get 요청
export async function getUsageLog() {
    try{
        const response = await api.get("/usage-logs");
        return(response)
    }catch(error){
        return(error);
    }
}

// 사용 기록 목록 상세 get 요청
export async function getUsageLogDetail(log_id:string) {
    try{
        const response = await api.get(`/usage-logs/${log_id}`);
        return(response)
    }catch(error){
        return(error);
    }
}

// 기록 제목 수정
export async function updateUsageLog(log_id:string) {
    try{
        const response = await api.patch(`/usage-logs/${log_id}`);
        return(response)
    }catch(error){
        return(error);
    }
}

// 기록 삭제
export async function deleteUsageLog(log_id:string) {
    try{
        const response = await api.delete(`/usage-logs/${log_id}`);
        return(response)
    }catch(error){
        return(error);
    }
}

// 서버 상태(헬스) 체크
export async function getServerStatus() {
    try{
        const response = await api.get("/health");
        return(response)
    }catch(error){
        return(error);
    }
}

// 나만의 질문 목록
export async function getPrivateQuestion() {
    try{
        const response = await api.get("/private-questions");
        return(response.data);
    }catch(error){
        return(error);
    }
}
