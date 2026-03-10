const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;
const expiration = '2h';

const authMiddleware = (req, res, next) => {
  let token = req.headers?.authorization;
  console.log('token: ' + token);

  if (token) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    res.status(401).json({ message: 'Bearer Token not supplied or invalid' });
    return;
  }

  try {
    const { data } = jwt.verify(token, SECRET_KEY, { maxAge: expiration });
    req.user = data;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token: ' + err.message });
  }
};

const signToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
  };
  return jwt.sign({ data: payload }, SECRET_KEY, { expiresIn: expiration });
};

module.exports = { authMiddleware, signToken };
