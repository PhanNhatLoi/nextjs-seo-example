import jwt from 'jsonwebtoken';

const middleWare =
  ({
    handler,
    acceptMethod = [],
    withAuth = false,
    withAuthAdmin = false
  }: {
    handler: any;
    acceptMethod?: ('PUT' | 'GET' | 'POST' | 'DElETE')[];
    withAuth?: boolean;
    withAuthAdmin?: boolean;
  }) =>
  async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (!acceptMethod.includes(req.method)) {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
    if (withAuth) {
      const token = getTokenFromRequest(req);
      if (!token) {
        return res
          .status(401)
          .json({ success: false, message: 'Unauthorized' });
      }
      const decoded = verifyToken(token);
      if (!decoded) {
        return res
          .status(401)
          .json({ success: false, message: 'Invalid token' });
      }
      return handler({ req, res, decoded });
    }
    if (withAuthAdmin) {
      // todo after
    }

    return handler({ req, res });
  };

export default middleWare;

const getTokenFromRequest = req => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return null;
  }

  const [, token] = authorizationHeader.split(' ');

  return token || null;
};

export const verifyToken = token => {
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    return null;
  }
};
