import { Box } from '@mui/material';
import ChatBox from '../components/chats/chat-box'
import ChatList from '../components/chats/chat-list';
import SearchUser from '../components/chats/search-user';
import { ChatState } from '../context/chat-provider';
import React, { useState } from 'react';

function ViewAllChats() {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div style={{ width: '100%' }}>
      <Box display='flex' flexDirection='row'>
        <Box display='flex' flexDirection='column'>
          {user && <SearchUser />}
          {user && <ChatList fetchAgain={fetchAgain} />}
        </Box>
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
      </Box>
    </div>
  );
}

export default ViewAllChats;
