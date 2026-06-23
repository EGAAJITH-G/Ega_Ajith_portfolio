import jwt from 'jsonwebtoken';

import TokenBlacklist from '../models/TokenBlacklist.js';

const auth = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({
      error: 'AUTH_REQUIRED',
      message: 'No authorization header found. Access denied.'
    });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({
      error: 'AUTH_MALFORMED',
      message: 'Authorization header must follow "Bearer <TOKEN>" format.'
    });
  }

  const token = parts[1];

  try {
    const isBlacklisted = await TokenBlacklist.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({
        error: 'TOKEN_REVOKED',
        message: 'Authorization token has been revoked.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'cyberpunk_ajith_secret_key_2026');
    req.user = decoded;
    req.token = token; // attach token for logout endpoint reference
    next();
  } catch (err) {
    return res.status(401).json({
      error: 'TOKEN_INVALID',
      message: 'Authorization token is invalid or has expired.'
    });
  }
};

export default auth;
