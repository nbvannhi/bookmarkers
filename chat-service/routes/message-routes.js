const express = require('express');
const { getChatMessages, sendMessage } = require('../controllers/message-controller');

const router = express.Router();

router.route('/:chatId').get(getChatMessages);
router.route('/').post(sendMessage);

module.exports = router;
