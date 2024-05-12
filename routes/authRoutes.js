const express = require('express');

const { createUser, userLogin } = require('../middlewares/myMediaBoard/userMiddleware');
const { sendMessage } = require('../controllers/messageController');

const router = express.Router();

router.post('/register', createUser, sendMessage);

router.post('/login', userLogin, sendMessage);

module.exports = router;
