import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { ChatState } from '../../context/chat-provider';
import {
  isLastMessage,
  isDiffSenderFromNext,
  getMessageMargin,
  isSameSenderAsPrev
} from '../../utils/chat-utils'
import ScrollableFeed from 'react-scrollable-feed';

const CURR_USER_MESSAGE_COLOR = '#BEE3F8';
const OTHER_USER_MESSAGE_COLOR = '#B9F5D0';

function ScrollableChat({ messages }) {
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      {
        messages &&
        messages.map(
          (message, index) => (
            <div style={{ display: 'flex' }} key={message._id}>
              {
                (isDiffSenderFromNext(messages, m, i, user.username) ||
                  isLastMessage(messages, i, user.username)) && (
                  <Tooltip
                    label={m.sender}
                    placement='bottom-start'
                    hasArrow
                  >
                    <Avatar
                      mt='7px'
                      mr={1}
                      size='sm'
                      cursor='pointer'
                      {...stringAvatar(m.sender)}
                    />
                  </Tooltip>
                )
              }
              <span
                style={{
                  backgroundColor: `${m.sender === user.username
                    ? CURR_USER_MESSAGE_COLOR
                    : OTHER_USER_MESSAGE_COLOR}`,
                  marginLeft: getMessageMargin(messages, m, i, user.username),
                  marginTop: isSameSenderAsPrev(messages, m, i, user.username) ? 3 : 10,
                  borderRadius: '20px',
                  padding: '5px 15px',
                  maxWidth: '75%',
                }}
              >
                {m.content}
              </span>
            </div>
          )
        )
      }
    </ScrollableFeed>
  );
}

export default ScrollableChat;
