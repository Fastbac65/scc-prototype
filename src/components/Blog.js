import { Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
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
import ContentCardMasonry from './ContentCardMasonry';

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

export default function Blog() {
  return (
    <Box sx={{ borderRadius: 0, p: 1 }}>
      <Fab size='small' component={RouterLink} to='/' color='primary' aria-label='add'>
        <HomeIcon />
      </Fab>
      <Fab size='small' color='secondary' aria-label='edit'>
        <EditIcon />
      </Fab>
      <Fab size='small' variant='extended'>
        <NavigationIcon sx={{ mr: 1 }} />
        Navigate
      </Fab>
      <Fab size='small' disabled aria-label='like'>
        <FavoriteIcon />
      </Fab>

      <ContentCardMasonry />
      <Box sx={{ width: 360 }}>
        <br></br>
        <Paper elevation={4}>
          <List aria-label='main mailbox folders'>
            <ListItemLink to='/' primary='Home' icon={<InboxIcon />} />
            <ListItemLink to='/training' primary='Training' icon={<DraftsIcon />} />
          </List>
          <Divider />
          <List aria-label='secondary mailbox folders'>
            <ListItemLink to='/booking' primary='Venue Hire' />
            <ListItemLink to='/history' primary='History' />
          </List>
        </Paper>
      </Box>
    </Box>
  );
}
