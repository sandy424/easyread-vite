import api from './instance';

export async function createUser() {
    try{
        const response = await api.post("/auth/signup");
        
    }
}

export async function getLogin() {
    try{
        const response = await api.get("/auth/me");
        return(response.data);
    }catch(error){
        return(error);
    }
}

export async function getPrivateQuestion() {
    try{
        const response = await api.get("/private-questions");
        return(response.data);
    }catch(error){
        return(error);
    }
}