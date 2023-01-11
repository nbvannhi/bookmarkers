const asyncHandler = require('express-async-handler');
const Message = require('../model/message');
const Chat = require('../model/chat');

// @description get all messages of a chat
// @route GET messages/:chatId
const getChatMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message
      .find({ chat: req.params.chatId })
      .populate('chat');
    return res.json(messages);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

// @description create new message
// @route POST messages
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId, username } = req.body;

  if (!content || !chatId || !username) {
    return res.sendStatus(400);
  }

  const newMessage = {
    sender: username,
    content: content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);

    // TODO: check following 2 lines
    message = await message.populate('chat');
    await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

    return res.json(message);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

module.exports = { getChatMessages, sendMessage };
