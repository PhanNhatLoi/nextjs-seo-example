import type { NextApiRequest, NextApiResponse } from 'next';
import Users from '../../../src/models/userModel';
import { compareSync } from 'bcrypt-ts';
import { acceptMethod, createAccessToken } from './constant';
import { serialize } from 'cookie';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (acceptMethod(['POST'], res, req))
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      if (user) {
        const isMatch = await compareSync(password, user.password);
        if (!isMatch)
          return res.status(401).json({ msg: 'Password is incorrect.' });

        const access_token = createAccessToken({ id: user._id });
        // Set the token in an HTTP cookie
        const cookieOptions = {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // Set to true in production
          maxAge: 60 * 60 * 1000, // Cookie expiration time in milliseconds (adjust as needed)
          sameSite: 'strict',
          path: '/user/access_token'
        };
        res.setHeader(
          'Set-Cookie',
          serialize('access_token', access_token, cookieOptions)
        );
        res.status(200).json({ msg: 'success', token: access_token });
      } else {
        res.status(401).json({ msg: 'This email does not exist.' });
      }
    } catch (err) {
      res.status(500).json({ error: 'failed to load data' });
    }
}
