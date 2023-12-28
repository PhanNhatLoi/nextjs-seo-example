import type { NextApiRequest, NextApiResponse } from 'next';
import Users from '../../../src/models/userModel';
import { acceptMethod, validateEmail, validatePassword } from './constant';
import { hashSync } from 'bcrypt-ts';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (acceptMethod(['POST'], res, req))
    try {
      const { name, email, password } = req.body;
      // check not empty value
      if (!name || !email || !password)
        return res.status(400).json({ msg: 'Please fill in all fields.' });

      // check validate email
      if (!validateEmail(email))
        return res.status(400).json({ msg: 'Invalid emails.' });

      // check validate password
      if (!validatePassword(password).validate)
        return res
          .status(400)
          .json({ msg: validatePassword(password).message });

      // check indentity email
      const user = await Users.findOne({ email });
      if (user) return res.status(400).json({ msg: 'Email already exists!' });

      // register new user

      const passwordHash = await hashSync(password, 12);
      const newUser = new Users({
        name,
        email,
        password: passwordHash
      });
      await newUser.save();
      res.json({ msg: 'Register new user success' });
    } catch (err) {
      res.status(500).json({ error: 'failed to load data' });
    }
}
