import { checkUser, findUser } from "@/service/userService";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try{
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ accessToken: null, message: "Incorrect form" });
        }
        const exist = await checkUser({ email: email });
        if (exist) {
            const found: any = await findUser({ email: email });
            if (found[0].id) {
                const validUser = bcrypt.compareSync(password, found[0].hash);
                if( validUser ){
                    const appToken: string | any = process.env.APP_TOKEN
                    const accessToken = jwt.sign({ email }, appToken, {
                        expiresIn: "3000s"
                    })
                    return res.status(200).json({ accessToken: accessToken, message: "Success" });
                }else{
                    return res.status(401).json({ accessToken: null, message: "Invalid password" });
                }
            }
        } else {
            return res.status(400).json({ accessToken: null, message: "User don't exist in DB" });
        }
    }catch(error){ throw error }
}
