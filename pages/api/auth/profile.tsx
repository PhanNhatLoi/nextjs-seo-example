import Users from '../../../src/models/userModel';
import middleWare from '../middleware';

const handler = async ({ res, decoded }) => {
  try {
    const user = await Users.findById(decoded.id).select('-password');
    if (user) res.status(200).json({ user });
    else {
      res.status(400).json({ msg: 'user not found!' });
    }
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
};

export default middleWare({ handler, withAuth: true, acceptMethod: ['GET'] });
