const asyncHandler = require('express-async-handler');
const Message = require('../model/message');
const Chat = require('../model/chat');

// @description create or fetch one-on-one chat
// @route POST chat
const accessChat = asyncHandler(async (req, res) => {
  const { sender, recipient } = req.body;

  if (!sender || !recipient) {
    return res.sendStatus(400);
  }

  let existingChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: sender } } },
      { users: { $elemMatch: { $eq: recipient } } },
      { chatName: null },
    ]
  })
    .populate('latestMessage');

  if (existingChat.length > 0) {
    return res.send(existingChat[0]);
  } else {
    const newChat = {
      isGroupChat: false,
      users: [sender, recipient],
    };

    try {
      const chat = await Chat.create(newChat);

      return res.status(200).json(chat);
    } catch (err) {
      res.status(400);
      throw new Error(err.message);
    }
  }
});

// @description create new group chat
// @route POST chat/group
const createGroupChat = asyncHandler(async (req, res) => {
  const admin = req.body.admin;
  if (!req.body.users || !req.body.chatName || req.body.chatName == '') {
    return res.status(400).send({ message: 'Missing users or chat name.' });
  }

  let users = JSON.parse(req.body.users);

  if (users.length < 1) {
    return res.status(400)
      .send('At least 2 users are required to form a group chat.');
  }

  users.push({ username: admin });

  const newChat = {
    chatName: req.body.chatName,
    users: users,
    isGroupChat: true,
    groupAdmin: admin,
  };

  try {
    let chat = await Chat.create(newChat);

    return res.status(200).json(chat);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

// @description get all chats for a user
// @route GET chats/:username
const getUserChats = asyncHandler(async (req, res) => {
  const username = req.params.username;

  try {
    const chats = await Chat.find({
      users: { $elemMatch: { $eq: username } }
    })
      .populate('latestMessage')
      .sort({ updatedAt: -1 });
    return res.status(200).send(chats);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});
