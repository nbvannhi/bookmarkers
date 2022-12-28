export const getChatUsername = (username, users) => {
  return users[0].username === username
    ? users[1].username
    : users[0].username;
};

export const isDiffSenderFromNext = (messages, m, i, username) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender !== m.sender ||
      messages[i + 1].sender === undefined) &&
    messages[i].sender !== username
  );
};

export const isLastMessage = (messages, i, username) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender &&
    messages[messages.length - 1].sender !== username
  );
};

export const isSameSenderAsPrev = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender === m.sender;
}

export const getMessageMargin = (messages, m, i, username) => {
  // TODO: change arbitrary value
  if (i < messages.length - 1 &&
    messages[i + 1].sender === m.sender &&
    messages[i].sender !== username
  ) {
    return 33;
  } else if (isDiffSenderFromNext(messages, m, i, username) ||
    isLastMessage(messages, i, username)
  ) {
    return 0;
  } else {
    return 'auto';
  }
}
