const express = require('express');

const auth = require('../middlewares/authMiddleware');

const { sendMessage } = require('../controllers/messageController');
const sendDisplay = require('../controllers/displayController');
const {
  newDisplayRequirements,
  createNewDisplay,
  editDisplayRequirements,
  getDisplayForUser,
  editDisplayForUser,
  formatDisplayForUser,
  deleteDisplay,
} = require('../middlewares/myMediaBoard/displayMiddleware');

const router = express.Router();

router.get('/:id', auth, getDisplayForUser, formatDisplayForUser, sendDisplay);

router.post('/new', auth, newDisplayRequirements, createNewDisplay, sendMessage);

router.patch('/edit/:id', auth, editDisplayRequirements, editDisplayForUser, sendMessage);

router.patch('/delete/:id', auth, deleteDisplay, sendMessage);

module.exports = router;
