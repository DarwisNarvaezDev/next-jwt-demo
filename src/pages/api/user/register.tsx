import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import {checkUser, saveUser} from '../../../service/userService';
import { saveLoginData } from '@/service/loginService';
import { createAccessToken, createRefreshToken } from '@/service/tokenService';
import { createAccessTokenCookie, createRefreshTokenCookie, getBrowserCookies, getBrowserCookiesKeys } from '@/service/cookieService';
import deleteBrowserCookies from '@/service/cookieService';

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
          joined: new Date().toLocaleString()
        })
        const {
          id: pUserId,
          email: pUserEmail
        } = user[0]
        // Persist in Login DB
        // Generate token
        const accessToken = createAccessToken(pUserEmail);
        const refreshToken = createRefreshToken(pUserId);
        // persist login in DB
        const login = await saveLoginData({ email: email, hash: hashedPassword, refresh: refreshToken});
        // COOKIES
        //Delete cookies is they exist
        const keys= getBrowserCookiesKeys(getBrowserCookies(req, res));
        deleteBrowserCookies(req, res, keys);
        // add new ones
        createAccessTokenCookie(req, res, accessToken);
        createRefreshTokenCookie(req, res, refreshToken);
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