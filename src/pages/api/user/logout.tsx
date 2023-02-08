import deleteBrowserCookies, { getValidTokenCookies } from "@/service/cookieService";
import { isValidAccessToken, isValidRefreshToken } from "@/service/tokenService";
import { deleteCookie, getCookies } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { getCookieParser } from "next/dist/server/api-utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {


    const cookies = getCookies({ req, res });
    let arr = []
    let user: null | number = null

    try {
        Object.entries(cookies).forEach(line => {
            arr.push({ key: line[0], value: line[1] })
        })
        const tokens = getValidTokenCookies(arr);
        
        if (tokens.keysOfRefreshTokens.length > 0 || tokens.keysOfAccessTokens.length > 0) {
            tokens.keysOfRefreshTokens.forEach(line => {
                if (isValidRefreshToken(line.value)) {
                    deleteCookie(line.key, {req, res})
                }
            });
            tokens.keysOfAccessTokens.forEach(line => {
                if (isValidAccessToken(line.value)) {
                    deleteCookie(line.key, {req, res})
                }
            });
            res.status(200).json("Listo")
        }
} catch (error) {
    res.status(500).json(JSON.stringify(error))
}

}