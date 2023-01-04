import { Box } from '@mui/material';
import ChatBox from '../components/chats/chat-box'
import ChatList from '../components/chats/chat-list';
import SearchUser from '../components/chats/search-user';
import { ChatState } from '../context/chat-provider';
import React, { useState } from 'react';

function ViewAllChats() {
  const [fetchAgain, setFetchAgain] = useState(true);
  const { user } = ChatState();

  return (
    <div style={{ width: '100%' }}>
      <Box sx={{ paddingY: 10 }} display='flex' position='fixed' flexDirection='row' justifyContent='space-evenly' width='100%'>
        <Box display='flex' flexDirection='column' width='30%'>
          {user && <SearchUser />}
          {user && <ChatList fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
        </Box>
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
      </Box>
    </div>
  );
}

export default ViewAllChats;
