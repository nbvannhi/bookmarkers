const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      trim: true,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
    },
    readBy: [{
      type: String,
    }],
  },
  { timestamps: true },
);

module.exports = mongoose.model('Message', messageSchema);
