import getDb from "@/db/DbService";

interface TypeLoginData { 
    email: string,
    hash: string
}

export async function saveLoginData({email, hash}: TypeLoginData){
    if( !email || !hash ) throw new Error('No user or hash received in parameters');
    try{
        const queryResult = getDb()("login").insert({ email, hash }).returning("*");
        return queryResult;
    }catch(error){
        throw error;
    }
}