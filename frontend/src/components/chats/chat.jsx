import {
  Box,
  CircularProgress,
  FormControl,
  IconButton,
  Input,
  Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import animationData from '../../animation/typing.json';
import { ChatState } from '../../context/chat-provider';
import axios from '../../utils/chat-axios';
import { getChatUsername } from '../../utils/chat-utils';
import ScrollableChat from './scrollable-chat';
import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

import io from 'socket.io-client';

const SERVER = 'http://localhost:4200';
let socket, selectedChatCompare;

function Chat({ fetchAgain, setFetchAgain }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const { selectedChat, setSelectedChat, user, notification, setNotification } = ChatState();

  const typingAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const getChatMessages = async () => {
    if (!selectedChat) {
      return;
    }

    try {
      setIsLoading(true);

      const res = await axios.get(`/messages/${selectedChat._id}`);
      setMessages(res.data);
      setIsLoading(false);

      socket.emit('join chat', selectedChat._id);
    } catch (err) {
      console.error(err);
      // TODO: add toast
    }
  };

  const sendMessage = async (event) => {
    if (event.key === 'Enter' && newMessage) {
      socket.emit('stop typing', selectedChat._id);

      try {
        setNewMessage('');

        const config = {
          headers: {
            'Content-Type': 'application/json',
          }
        };
        const res = await axios.post(
          '/messages',
          {
            username: user.username,
            content: newMessage,
            chatId: selectedChat._id,
          },
          config,
        );

        socket.emit('new message', res.data);
        setMessages([...messages, res.data]);
        setFetchAgain(true);
      } catch (err) {
        console.error(err);
        // TODO: add toast
      }
    }
  };

  const typingHandler = (event) => {
    setNewMessage(event.target.value);

    if (!isSocketConnected) {
      return;
    }

    if (!isTyping) {
      socket.emit('typing', selectedChat._id);
    }

    const lastTypingTime = new Date().getTime();
    const interval = 3000;

    setTimeout(() => {
      const currTime = new Date().getTime();
      const timeDiff = currTime - lastTypingTime;
      if (timeDiff >= interval && isTyping) {
        socket.emit('stop typing', selectedChat._id);
      }
    }, interval);
  };

  useEffect(() => {
    socket = io(SERVER);
    socket.emit('setup', user.username);
    socket.on('connected', () => setIsSocketConnected(true));
    socket.on('typing', () => setIsTyping(true));
    socket.on('stop typing', () => setIsTyping(false));
  }, []);

  useEffect(() => {
    getChatMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on('message received', (newMessage) => {
      if (!selectedChatCompare || selectedChatCompare._id !== newMessage.chat._id) {
        if (!notification.includes(newMessage)) {
          setNotification([newMessage, ...notification]);
        }
      } else {
        setMessages([...messages, newMessage]);
      }
      setFetchAgain(true);
    });
  }, []);

  return (
    <>
      {
        selectedChat
          ? (
            <>
              <Typography
                fontSize={{ base: '28px', md: '30px' }}
                pb={3}
                px={2}
                width='100%'
                fontFamily='Work sans'
                display='flex'
                justifyContent={{ base: 'space-between' }}
                alignItems='center'
              >
                <IconButton
                  display={{ base: 'flex', md: 'none' }}
                  onClick={() => setSelectedChat('')}
                >
                  <ArrowBackIcon />
                </IconButton>
                {
                  messages &&
                  (
                    selectedChat.isGroupChat
                      ? (
                        <>
                          {selectedChat.chatName}
                          { /* TODO: add UpdateGroupChatModal */}
                        </>
                      )
                      : (
                        <>
                          {getChatUsername(user.username, selectedChat.users)}
                          { /* TODO: add ProfileModal */}
                        </>
                      )
                  )
                }
              </Typography>
              <Box
                display='flex'
                flexDirection='column'
                justifyContent='flex-end'
                p={2}
                bgcolor='#E8E8E8'
                width='100%'
                height='100%'
                borderRadius='lg'
              >
                {
                  isLoading
                    ? (
                      <CircularProgress
                        size='xl'
                        width={20}
                        height={20}
                        margin='auto'
                      />
                    )
                    : (
                      <ScrollableChat messages={messages} />
                    )
                }
                <FormControl
                  required={true}
                  onKeyDown={sendMessage}
                  mt={3}
                  position='fixed'
                >
                  {
                    isTyping && (
                      <div>
                        <Lottie
                          options={typingAnimationOptions}
                          width={70}
                          style={{ marginBottom: 15, marginLeft: 0 }}
                        />
                      </div>
                    )
                  }
                  <Input
                    variant='filled'
                    bgcolor='#E0E0E0'
                    placeholder='Enter a message..'
                    value={newMessage}
                    onChange={typingHandler}
                  />
                </FormControl>
              </Box>
            </>
          )
          : (
            <Box
              display='flex'
              alignItems='center'
              justifyContent='center'
              height='100%'
            >
              <Typography
                fontSize='3xl'
                pb={3}
                fontFamily='Work sans'
              >
                Click on a user to start chatting
              </Typography>
            </Box>
          )
      }
    </>
  );
}

export default Chat;
