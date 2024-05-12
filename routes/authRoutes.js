const express = require('express');

const {
  createUser,
  userLogin,
  newUserRequirements,
  userLoginRequirements,
} = require('../middlewares/myMediaBoard/userMiddleware');
const { sendMessage } = require('../controllers/messageController');

const router = express.Router();

router.post('/register', newUserRequirements, createUser, sendMessage);

router.post('/login', userLoginRequirements, userLogin, sendMessage);

module.exports = router;
