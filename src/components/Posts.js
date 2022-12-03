import { Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import ContentCardMasonryPosts from './content/ContentCardMasonryPosts';
import { Stack } from '@mui/material';
import { useState } from 'react';

// ListItemLink Component
function ListItemLink(props) {
  const { icon, primary, to } = props;

  return (
    <li>
      <ListItem button component={RouterLink} to={to}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}
ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default function Posts() {
  const [like, setLike] = useState('');

  const handleLikeClick = () => {
    if (like === 'red') setLike('');
    else setLike('red');
  };

  return (
    <div>
      <Box sx={{ borderRadius: 0, pt: 3 }}>
        <Stack spacing={1} direction='row' sx={{ display: 'flex', justifyContent: 'center' }}>
          <Fab size='small' component={RouterLink} to='/' color='primary' aria-label='add'>
            <HomeIcon />
          </Fab>
          <Fab size='small' color='secondary' aria-label='edit'>
            <EditIcon />
          </Fab>
          {/* <Fab size='medium' variant='extended'>
            <NavigationIcon />
            Navigate
          </Fab> */}
          <Fab color='secondary' id='favourite' size='small' aria-label='like' onClick={handleLikeClick}>
            <FavoriteIcon sx={{ color: like }} />
          </Fab>
        </Stack>

        <ContentCardMasonryPosts />
      </Box>
    </div>
  );
}
