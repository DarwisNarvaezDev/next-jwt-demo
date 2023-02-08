import { createAccessTokenCookie, getValidTokenCookies } from "@/service/cookieService";
import { createAccessToken, getRefreshTokenData, isValidAccessToken, isValidRefreshToken } from "@/service/tokenService";
import { findUser, findUserById } from "@/service/userService";
import { getCookies } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";

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
        if (tokens.keysOfRefreshTokens.length > 0) {
            tokens.keysOfRefreshTokens.forEach(line => {
                if (isValidRefreshToken(line.value)) {
                    // Decode refresh token
                    const data = getRefreshTokenData(line.value)
                    if (data !== null) {
                        const { userId } = data;
                        // Get users data
                        user = userId
                    } else {
                        res.status(500).json("Invalid refresh token")
                    }
                } else {
                    res.status(401).json("Unauthorized");
                }
            });
        }
        // Get user data
        if( user ){
            const userFound = await findUserById({ id: user })
            const { email } = userFound[0];
            const newAccessToken = createAccessToken(email);
            createAccessTokenCookie(req, res, newAccessToken);
            res.status(200).json("New access token created.")
        }
        res.status(400).json("Unauthorized")
    } catch (error) {
        res.status(500).json("Hey")
    }

}