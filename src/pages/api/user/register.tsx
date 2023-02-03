import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import Login from '@/db/Login';
import Users from '@/db/Users';
import jwt from 'jsonwebtoken'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  
    const { email, username, password } = req.body;

    if( !email || !username || !password ){
        return res
            .status(400)
            .json(`${console.log(req.body)}Incorrect form submission`)
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    Login.push({
      email: email,
      hash: hashedPassword
    });

    Users.push({
      joined: new Date(Date.UTC(96, 1, 2, 3, 4, 5)).toUTCString(),
      username: username
    })

    const appToken: string | any = process.env.APP_TOKEN
    const accessToken = jwt.sign({ email }, appToken, {
      expiresIn: "3000s",
    });

    res.status(200).json({accessToken: accessToken})
}