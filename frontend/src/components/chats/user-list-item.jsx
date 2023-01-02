import { Avatar, Box, Typography } from '@mui/material';
import stringAvatar from '../../utils/avatar-utils';

function UserListItem({ user, handleFunction }) {
  
  return (
    <Box
      onClick={handleFunction}
      cursor='pointer'
      bgcolor='#E8E8E8'
      _hover={{
        background: '#38B2AC',
        color: 'white',
      }}
      width='100%'
      display='flex'
      alignItems='center'
      color='black'
      px={3}
      py={2}
      mb={2}
      borderRadius='lg'
    >
      <Avatar
        mr={2}
        size='sm'
        cursor='pointer'
        {...stringAvatar(user.username)}
      />
      <Box>
        <Typography>{user.username}</Typography>
      </Box>
    </Box>
  )
}

export default UserListItem;
