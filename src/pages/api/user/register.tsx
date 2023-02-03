import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {checkUser, saveUser} from '../../../service/userService';
import { saveLoginData } from '@/service/loginService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    const { email, password } = req.body;
    if( !email || !password ){
        return res
            .status(400)
            .json(`${console.log(req.body)}Incorrect form submission`)
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
        // Persist in Login DB
        const login = await saveLoginData({ email: email, hash: hashedPassword});
        // Generate token
        const appToken: string | any = process.env.APP_TOKEN
        const accessToken = jwt.sign({ email }, appToken, {
          expiresIn: "3000s",
        });
        // Response
        res.status(200).json({ accessToken: accessToken, message: null })
      }catch(error){
          res.status(400).json(error);
      }
    }else{
      res.status(200).json({ message: `User: ${email} already exists, using the refresh token` })
    }
}