const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    chatName: {
      type: String,
      trim: true,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    users: [{
      type:String,
    }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
    groupAdmin: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Chat', chatSchema);
