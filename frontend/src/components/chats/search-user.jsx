import { useDisclosure } from '@chakra-ui/hooks';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/modal';
import { Box, Button, CircularProgress, Input, Tooltip, Typography } from '@mui/material';
import { ChatState } from '../../context/chat-provider';
import axiosChat from '../../utils/chat-axios';
import axiosUser from '../../utils/user-axios';
import ChatLoading from './chat-loading';
import UserListItem from './user-list-item';
import React, { useState } from 'react';

function SearchUser() {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingChat, setIsLoadingChat] = useState(false);

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSearch = async () => {
    if (!search) {
      // TODO: add toast to prompt user to enter input
      return;
    }

    try {
      setIsLoading(true);

      const res = await axiosUser.get(`/users?search=${search}`);
      setSearchResult(res.data);

      setIsLoading(false);
    } catch (err) {
      console.error(err);
      // TODO: add toast to show error
    }
  };

  const accessChat = async (sender) => {
    try {
      setIsLoadingChat(true);

      const config = {
        headers: {
          'Content-Type': 'application/json',
        }
      };
      const res = await axiosChat.post('/chats', { sender }, config);
      const data = res.data;

      const isChatCreated = chats.find((c) => c.id === data._id);
      if (!isChatCreated) {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);

      setIsLoadingChat(false);
    } catch (err) {
      console.error(err);
      // TODO: add toast 
    }
  };

  return (
    <>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        bgcolor='white'
        width='100%'
        p='5px 10px 5px 10px'
      >

        <Tooltip label='Search Users to chat' placement='bottom-end'>
          <Button variant='ghost' onClick={onOpen}>
            <i className='fas fa-search'></i>
            <Typography display={{ base: 'none', md: 'flex' }} px={4}>
              Search User
            </Typography>
          </Button>
        </Tooltip>

        <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth='1px'>Search Users</DrawerHeader>
            <DrawerBody>
              <Box display='flex' pb={2}>
                <Input
                  placeholder='Search by username'
                  mr={2}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button onClick={handleSearch}>Go</Button>
              </Box>
              {isLoading ? (
                <ChatLoading />
              ) : (
                searchResult?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user.username)}
                  />
                ))
              )}
              {isLoadingChat && <CircularProgress ml='auto' display='flex' />}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
}

export default SearchUser;
