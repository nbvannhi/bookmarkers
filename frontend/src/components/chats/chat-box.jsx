import { Box } from '@mui/material';
import { ChatState } from '../../context/chat-provider';
import Chat from './chat';

function ChatBox({ fetchAgain, setFetchAgain }) {
  const { selectedChat } = ChatState();

  return (
    <Box
      display={{ base: selectedChat ? 'flex' : 'none', md: 'flex' }}
      alignItems='center'
      flexDirection='column'
      p={3}
      bgcolor='white'
      width='60%'
      borderRadius='lg'
    >
      <Chat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
}

export default ChatBox;
