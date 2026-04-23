import api from './instance';

export async function getUsageLog() {
    try{
        const response = await api.get("/useage-log");
        return(response.data);
    }catch(error){
        return(error)
    }
}

