export const appToken: string | any = process.env.APP_TOKEN;
import jwt from 'jsonwebtoken'

export function createAccessToken(userEmail: string){
    try{
        const accesToken = jwt.sign({userEmail}, appToken ,{
            expiresIn: '3000s'
        });
        return accesToken;
    }catch(error){
        throw error
    }
}

export function createRefreshToken(userId: string){
    try{
        const refreshToken = jwt.sign({userId}, appToken ,{
            expiresIn: '3000s'
        });
        return refreshToken;
    }catch(error){
        throw error
    }
}

export function isValidAccessToken(accessToken: string){
    try{
        const validToken = jwt.verify(accessToken, appToken);
        if( validToken?.userEmail ){
            return true;
        }else{
            return false;
        }
    }catch(error){
        throw error
    }
}

export function isValidRefreshToken(refreshToken: string){
    try{
        const validToken = jwt.verify(refreshToken, appToken);
        if( validToken?.userId ){
            return true;
        }else{
            return false;
        }
    }catch(error){
        throw error
    }
}

export function getValidTokens(tokensArray: string[]){
    try{
        let refreshTokenArray: any[] = []
        let accessTokenArray: any[] = []
        tokensArray.forEach( token =>{
            if( isValidRefreshToken(token) ){
                refreshTokenArray.push(token);
            }
            if( isValidAccessToken(token) ){
                accessTokenArray.push(token);
            }
        })
        return {
            refreshTokens: refreshTokenArray,
            accessTokens: accessTokenArray
        }
    }catch(error){
        throw error
    }
}