import getDb from "@/db/DbService";

interface TypeLoginData { 
    email?: string,
    hash?: string,
    refresh?: string,
}

export async function findLoginData({ email }: TypeLoginData){
    try{
        if( !email ) throw new Error('No user received in parameters');
        const found = await getDb()("login").where("email", email).returning("*");
        return found;
    }catch(error){
        throw error;
    }
}

export async function saveLoginData({email, hash, refresh}: TypeLoginData){
    if( !email || !hash ) throw new Error('No user or hash received in parameters');
    try{
        const queryResult = getDb()("login").insert({ email, hash, refresh }).returning("*");
        return queryResult;
    }catch(error){
        throw error;
    }
}

export async function saveNewRefreshToken({ email, refresh }: TypeLoginData){
    try{
        if( !refresh ) throw new Error('No user received in parameters');
        const found = await getDb()("login").where("email", email).update('refresh', refresh).returning("*");
        return found;
    }catch(error){
        throw error;
    }
}