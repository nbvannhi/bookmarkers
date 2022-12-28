import { Box, Stack, Typography } from '@mui/material';
import axios from '../../utils/chat-axios';
import { ChatState } from '../../context/chat-provider';
import ChatLoading from './chat-loading';
import React, { useEffect, useState } from 'react';
import { getChatUsername } from '../../utils/chat-utils';

const CHAT_BG = '#E8E8E8';
const SELECTED_CHAT_BG = '#38B2AC';

function ChatList({ fetchAgain }) {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const getUserChats = async () => {
    try {
      const username = loggedUser.username;
      const res = await axios.get(`/chats/${username}`);
      setChats(res.data);
    } catch (err) {
      // TODO: handle error with toast
      console.error(err);
    }
  }

  useEffect(() => {
    setLoggedUser(user);
    getUserChats();
  }, [fetchAgain]);

  return (
    <Box
      d={{ base: selectedChat ? 'none' : 'flex', md: 'flex' }}
      flexDir='column'
      alignItems='center'
      p={3}
      bg='white'
      w={{ base: '100%', md: '31%' }}
      borderRadius='lg'
      borderWidth='1px'
    >
      <Box
        b={3}
        px={3}
        fontSize={{ base: '28px', md: '30px' }}
        fontFamily='Work sans'
        d='flex'
        w='100%'
        justifyContent='space-between'
        alignItems='center'>
        <Typography>Chats</Typography>
        { /* TODO: add GroupChatModal */}
      </Box>
      <Box
        d='flex'
        flexDir='column'
        p={3}
        bg='#F8F8F8'
        w='100%'
        h='100%'
        borderRadius='lg'
        overflowY='hidden'
      >
        {
          chats
            ? (
              <Stack overflowY='scroll'>
                {
                  chats.map((chat) => (
                    <Box
                      onClick={() => setSelectedChat(chat)}
                      cursor='pointer'
                      bg={selectedChat === chat ? SELECTED_CHAT_BG : CHAT_BG}
                      color={selectedChat === chat ? 'white' : 'black'}
                      px={3}
                      py={2}
                      borderRadius='lg'
                      key={chat._id}
                    >
                      <Typography>
                        {
                          chat.isGroupChat
                            ? chat.chatName
                            : getChatUsername(loggedUser.username, chat.users)
                        }
                      </Typography>
                      {
                        chat.latestMessage && (
                          <Typography fontSize='xs'>
                            <b>{chat.latestMessage.sender} : </b>
                            {
                              chat.latestMessage.content.length > 50
                              ? chat.latestMessage.content.substring(0, 51) + '...'
                              : chat.latestMessage.content
                            }
                          </Typography>
                        )
                      }
                    </Box>
                  ))
                }
              </Stack>
            )
            : (
              <ChatLoading />
            )
        }
      </Box>
    </Box>
  );
}

export default ChatList;
