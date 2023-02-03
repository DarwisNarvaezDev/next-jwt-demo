// 1. save Login info
// 2. save User info

interface TypeLoginInfo {
    username: string,
    hash: string
}

export async function saveLoginInfo({username, hash}: TypeLoginInfo){
    if( !username || !hash ) throw new Error('No user or hash received in parameters');
    // Db transaction
    
}