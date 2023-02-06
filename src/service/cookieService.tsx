import { setAccessCookieExpiration, setRefreshCookieExpiration } from "@/util/ExpirationCalculator";
import { deleteCookie, getCookies, setCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { appToken } from "./tokenService";

const cookiesKeys = {
    refreshCookieKey: `${appToken}${'refreshToken'}`,
    accessCookieKey: `${appToken}${'accessToken'}`,
}

export function createAccessTokenCookie(
    req: NextApiRequest,
    res: NextApiResponse,
    value: string
    ){
    try {
        setCookie(cookiesKeys.accessCookieKey, value, {req, res, expires: setAccessCookieExpiration(15)});
    } catch (error) {
        throw error;
    }
}

export function createRefreshTokenCookie(
    req: NextApiRequest,
    res: NextApiResponse,
    value: string
    ){
    try {
        setCookie(cookiesKeys.refreshCookieKey, value, {req, res, expires: setRefreshCookieExpiration(15)});
    } catch (error) {
        throw error;
    }
}

export function isAccessTokenCookie(
    cookieKey: string
){
    try {
        if( cookieKey === cookiesKeys.accessCookieKey ){
            return true;
        }else{
            return false
        }
    } catch (error) {
        throw error;
    }
}

export function isRefreshTokenCookie(
    cookieKey: string
){
    try {
        if( cookieKey === cookiesKeys.refreshCookieKey ){
            return true;
        }else{
            return false
        }
    } catch (error) {
        throw error;
    }
}

export function getValidTokenKeys(
    cookiesKeysData: string[]
){
    try {
        let accessTokenKeys: any[] = []
        let refreshTokenKeys: any[] = []
        cookiesKeysData.forEach( key => {
            if( key === cookiesKeys.accessCookieKey ) accessTokenKeys.push(key);
            if( key === cookiesKeys.refreshCookieKey ) refreshTokenKeys.push(key);
        })
        return {
            keysOfAccessTokens: accessTokenKeys,
            keysOfRefreshTokens: refreshTokenKeys
        }
    } catch (error) {
        throw error;
    }
}

export function deleteCookies(
    req: NextApiRequest,
    res: NextApiResponse,
    keys: string[]
){
    try {
        keys.forEach( key =>{
            // console.log(`Key to delete: ${JSON.stringify(key)}`);
            deleteCookie(key, {req, res})
        })
    } catch (error) {
        throw error;
    }
}

export function getBrowserCookies(
    req: NextApiRequest,
    res: NextApiResponse,
){
    try {
        const cookies = getCookies({
            req, res
        })
        return cookies;
    } catch (error) {
        throw error;
    }
}

export function getBrowserCookiesKeys(cookies: any){
    try {
        let keys: any[] = []
        Object.keys(cookies).forEach( key => {
            keys.push(key)
        });
        return keys;
    } catch (error) {
        throw error;
    }
}

export default function deleteBrowserCookies(
    req: NextApiRequest,
    res: NextApiResponse,
    keysData: any[]){
    try {
        deleteCookies(req, res, keysData);
    } catch (error) {
        throw error;
    }
}