import jwt from 'jsonwebtoken';
export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export const validatePassword = (
  password: string
): {
  validate: boolean;
  message: string | null;
} => {
  // basic min 6 character
  if (password.length < 6) {
    return {
      validate: false,
      message: 'Password must be at least 6 characters'
    };
  }

  return {
    validate: true,
    message: null
  };
};

export const createAccessToken = payload => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1d'
  });
};

export const verifyToken = token => {
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    return null;
  }
};

export const withAuth = handler => {
  return async (req, res) => {
    const token = getTokenFromRequest(req);

    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    return handler({ req, res, decoded });
  };
};

const getTokenFromRequest = req => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return null;
  }

  const [, token] = authorizationHeader.split(' ');

  return token || null;
};

export const acceptMethod = (
  method: ('GET' | 'PUT' | 'POST' | 'DELETE')[],
  res,
  req
) => {
  if (method.includes(req.method)) {
    return true;
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};
