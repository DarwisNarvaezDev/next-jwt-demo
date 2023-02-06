import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {checkUser, saveUser} from '../../../service/userService';
import { saveLoginData } from '@/service/loginService';
import { createAccessToken, createRefreshToken } from '@/service/tokenService';
import getBrowserCookiesKeys, { createAccessTokenCookie, createRefreshTokenCookie, getBrowserCookies } from '@/service/cookieService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    const { email, password } = req.body;
    if( !email || !password ){
        return res
            .status(400)
            .json({ accessToken: null, message: "Invalid form submission" })
    }
    // Validate if user exists
    const exist = await checkUser({email: email});
    if( !exist ){
      try{
        const hashedPassword = bcrypt.hashSync(password, 10);
        // Persist in User DB
        const user: any = await saveUser({ 
          email: email, 
          joined: new Date(Date.UTC(96, 1, 2, 3, 4, 5)).toUTCString()
        })
        const {
          id: pUserId,
          email: pUserEmail
        } = user[0]
        // Persist in Login DB
        const login = await saveLoginData({ email: email, hash: hashedPassword});
        // Generate token
        const accessToken = createAccessToken(pUserEmail);
        const refreshToken = createRefreshToken(pUserId);
        // COOKIES
        // createAccessTokenCookie(req, res, accessToken);
        // createRefreshTokenCookie(req, res, refreshToken);
        getBrowserCookiesKeys(getBrowserCookies(req, res))
        // COOKIES
        // Response
        res.status(200).json({ accessToken: accessToken, message: null })
      }catch(error){
          res.status(400).json(error);
      }
    }else{
      res.status(400).json({ accessToken: null, message: `User: ${email} already exist.` })
    }
}