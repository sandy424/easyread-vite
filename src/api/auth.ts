import api from './instance';
import type { LoginRequest, SignupRequest, UsageLogUpdateRequest } from './types';

// 회원가입 post 요청
export async function postSignup(body: SignupRequest) {
    try{
        const response = await api.post("/auth/signup", body);
        return(response.data);
    }catch(error){
        return(error);
    }
}

// 로그인 post 요청
export async function postLogin(body: LoginRequest) {
    try{
        const response = await api.post("/auth/login", body);
        return(response.data);
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


// 서버 상태(헬스) 체크
export async function getServerStatus() {
    try{
        const response = await api.get("/health");
        return(response.data)
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
