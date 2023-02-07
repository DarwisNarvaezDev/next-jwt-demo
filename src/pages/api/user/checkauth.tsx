import { getValidTokenCookies } from "@/service/cookieService";
import { isValidAccessToken, isValidRefreshToken } from "@/service/tokenService";
import { NextApiRequest, NextApiResponse } from "next";

export interface CheckAuthProps {

}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const body = req.body
    const headers = req.headers
    const cookies = req.cookies

    let arr = []

    Object.entries(body).forEach( line => {
        arr.push({ key: line[0], value: line[1] })
    })
    const tokens = getValidTokenCookies(arr);
    if( tokens.keysOfAccessTokens.length > 0 ){
        tokens.keysOfAccessTokens.forEach( line =>{
            if( isValidAccessToken(line.value) ){
                res.status(200).json("Authorized");
            }else{
                res.status(401).json("Unauthorized");
            }
        });
    }else{
        // Use Refresh token
        if( tokens.keysOfRefreshTokens.length > 0 ){
            tokens.keysOfRefreshTokens.forEach( line =>{
                if( isValidRefreshToken(line.value) ){
                    res.status(202).json("Authorized, need new acces token");
                }else{
                    res.status(401).json("Unauthorized");
                }
            });
        }else{
            res.status(401).json("Unauthorized");
        }
    }
    

}