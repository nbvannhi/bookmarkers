import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, CircularProgress, Drawer, Input, List, Typography } from '@mui/material';
import { ChatState } from '../../context/chat-provider';
import axiosChat from '../../utils/chat-axios';
import axiosUser from '../../utils/user-axios';
import ListLoading from './list-loading';
import UserListItem from './user-list-item';
import React, { useState } from 'react';

const DRAWER_POSITION = 'left';

function SearchUser() {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingChat, setIsLoadingChat] = useState(false);

  const {
    setSelectedChat,
    user,
    chats,
    setChats,
  } = ChatState();

  const toggleDrawer = (isOpen) => (event) => {
    if (event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setIsDrawerOpen(isOpen);
  }

  const handleSearch = async () => {
    if (!search) {
      // TODO: add toast to prompt user to enter input
      return;
    }

    try {
      setIsLoading(true);
      const userId = localStorage.getItem('userId');

      const res = await axiosUser.get(`/users/${userId}?search=${search}`);
      setSearchResult(res.data);

      setIsLoading(false);
    } catch (err) {
      console.error(err);
      // TODO: add toast to show error
    }
  };

  const accessChat = async (other) => {
    try {
      setIsLoadingChat(true);

      const config = {
        headers: {
          'Content-Type': 'application/json',
        }
      };
      const res = await axiosChat.post('/chats', { user: user.username, other: other }, config);
      const data = res.data;

      const isChatExist = chats.find((c) => c._id === data._id);

      if (!isChatExist) {
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
        p='5px'
      >
        <Button variant='ghost' sx={{ width: '100%' }} onClick={toggleDrawer(true)}>
          <SearchIcon />
          <Typography px={1}>
            Search Users
          </Typography>
        </Button>
      </Box>

      <Drawer
        anchor={DRAWER_POSITION}
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: '100%', margin: '10px' }}
          height='100%'
          role='presentation'
        >
          <Typography variant='body1'>
            Search Users
          </Typography>
          <Box display='flex' paddingBottom={2}>
            <Input
              placeholder='Search by username'
              maxRows={2}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button onClick={handleSearch}>Go</Button>
          </Box>
          <Box
            height='80%'
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            {
              isLoading
                ? (
                  <ListLoading />
                )
                : (
                  <List>
                    {
                      searchResult?.map((u) => (
                        <UserListItem
                          key={u._id}
                          user={u}
                          handleClickUser={() => accessChat(u.username)}
                        />
                      ))
                    }
                  </List>
                )
            }
            {isLoadingChat && <CircularProgress />}
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export default SearchUser;
