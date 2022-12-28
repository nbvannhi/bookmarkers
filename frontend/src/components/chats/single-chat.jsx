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
import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

import io from 'socket.io-client';

const SERVER = 'http://localhost:4200';
let socket, selectedChatCompare;

function SingleChat({ fetchAgain, setFetchAgain }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [istyping, setIsTyping] = useState(false);

  const { selectedChat, setSelectedChat, user, notification, setNotification } = ChatState();

  const defaultOptions = {
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
    if (event.key === 'enter' && newMessage) {
      socket.emit('stop typing', selectedChat._id);

      try {
        setNewMessage('');

        const config = {
          headers: {
            'Content-Type': 'application/json',
          }
        };
        const res = await axios.post(
          '/api/messages',
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config,
        );

        socket.emit('new message', res.data);
        setMessages([...messages, data]);
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

    if (!istyping) {
      socket.emit('typing', selectedChat._id);
    }

    const lastTypingTime = new Date().getTime();
    const interval = 3000;

    setTimeout(() => {
      const currTime = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= interval && istyping) {
        socket.emit('stop typing', selectedChat._id);
      }
    }, interval);
  };

  useEffect(() => {
    socket = io(SERVER);
    socket.emit('setup', user);
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
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessage]);
      }
    });
  });

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
                w='100%'
                fontFamily='Work sans'
                d='flex'
                justifyContent={{ base: 'space-between' }}
                alignItems='center'
              >
                <IconButton
                  d={{ base: 'flex', md: 'none' }}
                  icon={<ArrowBackIcon />}
                  onClick={() => setSelectedChat('')}
                />
                {
                  messages &&
                  (
                    selectedChat.isGroupChat
                      ? (
                        <>
                          {selectedChat.chatName}
                          { /* TODO: add UpdateGroupChatModal */ }
                        </>
                      )
                      : (
                        <>
                          {getChatUsername(user, selectedChat.users)}
                          { /* TODO: add ProfileModal */ }
                        </>
                      )
                  )
                }
              </Typography>
              <Box
                d='flex'
                flexDir='column'
                justifyContent='flex-end'
                p={3}
                bg='#E8E8E8'
                w='100%'
                h='100%'
                borderRadius='lg'
                overflowY='hidden'
              >
                {
                  isLoading
                    ? (
                      <CircularProgress
                        size='xl'
                        w={20}
                        h={20}
                        alignSelf='center'
                        margin='auto'
                      />
                    )
                    : (
                      <div>
                        <ScrollableChat messages={messages} />
                      </div>
                    )
                }
                <FormControl
                  required={true}
                  onKeyDown={sendMessage}
                  mt={3}
                >
                  {
                    isTyping && (
                      <div>
                        <Lottie
                          options={defaultOptions}
                          width={70}
                          style={{ marginBottom: 15, marginLeft: 0 }}
                        />
                      </div>
                    )
                  }
                  <Input
                    variant='filled'
                    bg='#E0E0E0'
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
              d='flex'
              alignItems='center'
              justifyContent='center'
              h='100%'
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

export default SingleChat;
