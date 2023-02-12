import { getValidTokenCookies } from "@/service/cookieService";
import { isValidAccessToken, isValidRefreshToken, getRefreshTokenData, getAccessTokenData } from "@/service/tokenService";
import { findUserById } from "@/service/userService";
import { getCookies } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const cookies = getCookies({ req, res });
    let arr: any[] = []
    let user: null | number = null
    let responseList: any[] = []

    try {
        Object.entries(cookies).forEach(line => {
            arr.push({ key: line[0], value: line[1] })
        })
        const tokens = getValidTokenCookies(arr);
        if (tokens.keysOfRefreshTokens.length > 0 || tokens.keysOfAccessTokens.length > 0) {
            tokens.keysOfRefreshTokens.forEach(line => {
                if (isValidAccessToken(line.value)) {
                    const data: any = getAccessTokenData(line.value);
                    const { userId } = data;
                    user = userId;                    
                    responseList.push({ key: "Access Token", value: line.value , button: true})
                }
                if (isValidRefreshToken(line.value)) {
                    responseList.push({ key: "Refresh Token", value: line.value, button: true})
                }
            });
            if( user !== null ){
                const userFound = await findUserById({ id: user });
                const { email, created_at: joined } = userFound[0];
                responseList.push({ key: "User", value: email});
                responseList.push({ key: "Joined", value: joined});
            }
            res.status(200).json(responseList)
        }
} catch (error) {
    res.status(500).json(JSON.stringify(error))
}
}