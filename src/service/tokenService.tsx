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

export function isValidAccessToken(accessToken: any){
    try{
        let valid = true
        jwt.verify(accessToken, appToken, (err, decoded) => {
            if( !err ){
                valid = true
            }
        });
        return valid
    }catch(error){
        throw error
    }
}

export function isValidRefreshToken(refreshToken: string){
    try{
        let valid = true
        jwt.verify(refreshToken, appToken, (err, decoded) => {
            if( !err ){
                valid = true
            }
        });
        return valid
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

export function getRefreshTokenData(refreshToken: string){
    try{
        let decodedUser = null
        const validToken = jwt.verify(refreshToken, appToken, (err, decoded) => {
            if( err ){
                return false
            }else{
                decodedUser = decoded
            }
        });
        return decodedUser
    }catch(error){
        throw error
    }
}

export function getAccessTokenData(accessToken: string){
    try{
        let decodedUser = null
        const validToken = jwt.verify(accessToken, appToken, (err, decoded) => {
            if( err ){
                return false
            }else{
                decodedUser = decoded
            }
        });
        return decodedUser
    }catch(error){
        throw error
    }
}