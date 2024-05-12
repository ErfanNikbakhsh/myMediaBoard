const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const asynchandler = require('express-async-handler');
const { logMiddleware } = require('../utils/Api-Features');

const auth = asynchandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decoded.userId).exec();
        req.user = user;
        logMiddleware('auth');
        next();
      }
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token Expired. Please Login Again.' });
      } else {
        return res.status(401).json({ message: 'Not Authorized, Please Login Again' });
      }
    }
  } else {
    throw new Error('There Is No Token Attached!');
  }
});

module.exports = auth;
