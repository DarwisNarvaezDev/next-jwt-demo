import { checkUser } from "@/service/userService";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createRefreshToken } from "@/service/tokenService";
import { findLoginData, saveNewRefreshToken } from "@/service/loginService";
import { createAccessTokenCookie, createRefreshTokenCookie } from "@/service/cookieService";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ accessToken: null, message: "Incorrect form" });
        }
        const exist = await checkUser({ email: email });
        if (exist) {
            const found: any = await findLoginData({ email: email });
            const {
                id: userId,
                email: userEmail,
                hash: userHash,
                refresh: userRefresh
            }: any = found[0];
            if (userId) {
                const validUser = bcrypt.compareSync(password, userHash);
                if (validUser) {
                    const appToken: string | any = process.env.APP_TOKEN
                    const accessToken = jwt.sign({ userEmail }, appToken, {
                        expiresIn: "3000s"
                    })
                    const newRefreshToken = createRefreshToken(userId);
                    await saveNewRefreshToken({ email: userEmail, refresh: newRefreshToken })
                    createRefreshTokenCookie(req, res, newRefreshToken);
                    createAccessTokenCookie(req, res, accessToken);
                    res.status(200).json({ accessToken: accessToken, message: "Success" });
                } else {
                    res.status(401).json({ accessToken: null, message: "Invalid password" });
                }
            }
        } else {
            res.status(400).json({ accessToken: null, message: "User don't exist in DB" });
        }
    } catch (error) {
        res.status(200).json({ message: "Error" });
    }
}
