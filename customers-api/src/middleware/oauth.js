const jwt = require('jsonwebtoken');

const validateOAuthToken = (req, res, next) => {
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

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized or expired token',
        error: err.message
      });
    }

    req.user = decoded;

    next();
  });
};

module.exports = { validateOAuthToken };
