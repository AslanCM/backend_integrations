const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized or expired token'
    });
  }

  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized or expired token'
    });
  }

  const token = authHeader.substring(7);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized or expired token'
    });
  }

  if (String(process.env.SERVICE_TOKEN).trim() === String(token).trim()) {
    next();
    return;
  }

  return res.status(401).json({
    success: false,
    message: 'Unauthorized or expired token'
  });
};

module.exports = { validateToken };
