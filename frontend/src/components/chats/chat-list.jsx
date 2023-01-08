import { Box, Divider, Stack, Typography } from '@mui/material';
import axios from '../../utils/chat-axios';
import { ChatState } from '../../context/chat-provider';
import ListLoading from './list-loading';
import React, { useEffect, useState } from 'react';
import { getChatUsername } from '../../utils/chat-utils';

const CHAT_BG = '#E8E8E8';
const SELECTED_CHAT_BG = '#38B2AC';
const LAST_MESS_COLOR = 'black';
const SELECTED_LAST_MESS_COLOR = 'white';
const USER_COLOR = 'black';
const SELECTED_USER_COLOR = 'white';

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
      px={3}
      pt={1}
      pb={2}
      bgcolor='white'
      width='100%'
      borderRadius='lg'
    >
      <Box
        px={3}
        display='flex'
        width='100%'
        justifyContent='space-between'
        alignItems='center'
        position='sticky'
      >
        <Typography marginLeft={2}
          fontSize={{ base: '28px', md: '30px' }}
          fontFamily='Work sans'
        >
          Chats
        </Typography>
        { /* TODO: add GroupChatModal */}
      </Box>
      <Box
        display='flex'
        flexDirection='column'
        py={1}
        px={2}
        bgcolor='#F8F8F8'
        width='100%'
        borderRadius='lg'
        style={{
          height: 280,
          maxHeight: 280,
          overflow: 'scroll'
        }}
        alignItems='center'
      >
        {
          chats
            ? (
              <Stack width='100%' alignItems='center'>
                {
                  chats.map((chat) => (
                    <Box
                      onClick={() => setSelectedChat(chat)}
                      cursor='pointer'
                      bgcolor={selectedChat === chat ? SELECTED_CHAT_BG : CHAT_BG}
                      margin={1}
                      borderRadius='lg'
                      height={50}
                      width='90%'
                      key={chat._id}
                    >
                      <Typography
                        color={selectedChat === chat ? SELECTED_USER_COLOR : USER_COLOR}
                      >
                        <b>
                          {
                            chat.isGroupChat
                              ? chat.chatName
                              : getChatUsername(user.username, chat.users)
                          }
                        </b>
                      </Typography>
                      <Divider />
                      {
                        chat.latestMessage && (
                          <Typography
                            fontSize='xs'
                            color={selectedChat === chat ? SELECTED_LAST_MESS_COLOR : LAST_MESS_COLOR}
                          >
                            <b>{chat.latestMessage.sender}: </b>
                            {
                              chat.latestMessage.content.length > 20
                                ? chat.latestMessage.content.substring(0, 20) + '...'
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
