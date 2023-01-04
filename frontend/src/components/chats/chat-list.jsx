import { Box, Stack, Typography } from '@mui/material';
import axios from '../../utils/chat-axios';
import { ChatState } from '../../context/chat-provider';
import ListLoading from './list-loading';
import React, { useEffect, useState } from 'react';
import { getChatUsername } from '../../utils/chat-utils';

const CHAT_BG = '#E8E8E8';
const SELECTED_CHAT_BG = '#38B2AC';

function ChatList({ fetchAgain, setFetchAgain }) {
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const getUserChats = async () => {
    try {
      const username = user.username;
      const res = await axios.get(`/chats/${username}`);
      setChats(res.data);
      setFetchAgain(false);
    } catch (err) {
      // TODO: handle error with toast
      console.error(err);
    }
  }

  useEffect(() => {
    getUserChats();
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? 'none' : 'flex', md: 'flex' }}
      flexDirection='column'
      alignItems='center'
      p={3}
      bgcolor='white'
      width='100%'
      borderRadius='lg'
    >
      <Box
        px={3}
        fontSize={{ base: '28px', md: '30px' }}
        fontFamily='Work sans'
        display='flex'
        width='100%'
        justifyContent='space-between'
        alignItems='center'>
        <Typography>Chats</Typography>
        { /* TODO: add GroupChatModal */}
      </Box>
      <Box
        display='flex'
        flexDirection='column'
        p={3}
        bgcolor='#F8F8F8'
        width='100%'
        borderRadius='lg'
      >
        {
          chats
            ? (
              <Stack>
                {
                  chats.map((chat) => (
                    <Box
                      onClick={() => setSelectedChat(chat)}
                      cursor='pointer'
                      bgcolor={selectedChat === chat ? SELECTED_CHAT_BG : CHAT_BG}
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
                            : getChatUsername(user.username, chat.users)
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
              <ListLoading />
            )
        }
      </Box>
    </Box>
  );
}

export default ChatList;
