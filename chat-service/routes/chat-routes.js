const express = require('express');
const { getUserChats, accessChat, createGroupChat } = require('../controllers/chat-controller');

const router = express.Router();

router.route('/:username').get(getUserChats);
router.route('/').post(accessChat);
router.route('/group').post(createGroupChat);

module.exports = router;
