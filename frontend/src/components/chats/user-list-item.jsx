import { Avatar, Box, Button, Typography } from '@mui/material';
import stringAvatar from '../../utils/avatar-utils';

const HOVER_COLOR = '#38B2AC';

function UserListItem({ user, handleClickUser }) {

  return (
    <Box
      onClick={handleClickUser}
      cursor='pointer'
      bgcolor='#E8E8E8'
      width='100%'
      display='flex'
      alignItems='center'
      color='black'
      padding='5px'
      marginBottom={2}
      borderRadius='lg'
      sx={{
        ':hover': {
          background: `${HOVER_COLOR}`,
          color: 'white',
        }
      }}
    >
      <Avatar
        mr={2}
        size='sm'
        cursor='pointer'
        {...stringAvatar(user.username)}
      />
      <Box
        marginLeft='5px'
      >
        <Typography>{user.username}</Typography>
      </Box>
    </Box>
  )
}

export default UserListItem;
