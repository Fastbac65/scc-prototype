import { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';

import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { ListItemIcon, ListItemText } from '@mui/material';
import { useValue } from '../context/ContextProvider';

import { Delete, Edit, MoreVert } from '@mui/icons-material';

import EditPost from './EditPost';
import deletePost from '../context/deletePost';

function PostOptions({ postDoc }) {
  const collectionName = 'Posts';

  const {
    login,
    currentUser,
    state: { alert, modal },
    dispatch,
  } = useValue();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDelete = async () => {
    //delete
    setAnchorElUser(null); // close the menu after clicking
    dispatch({ type: 'START_LOADING' });

    try {
      await deletePost(postDoc);
      dispatch({
        type: 'UPDATE_ALERT',
        payload: { ...alert, open: true, severity: 'success', message: 'Post deleted', duration: 6000 },
      });
    } catch (error) {
      dispatch({
        type: 'UPDATE_ALERT',
        payload: { ...alert, open: true, severity: 'error', message: error.message, duration: 6000 },
      });
    }
    dispatch({ type: 'END_LOADING' });
  };

  const handleEdit = async () => {
    //delete
    setAnchorElUser(null); // close the menu after clicking

    dispatch({
      type: 'MODAL',
      payload: { ...modal, open: true, content: <EditPost postDoc={postDoc} />, title: 'Edit Post' },
    });

    // try {
    //   //
    // } catch (error) {
    //   dispatch({
    //     type: 'UPDATE_ALERT',
    //     payload: { ...alert, open: true, severity: 'error', message: error.message, duration: 6000 },
    //   });
    // }
  };

  return (
    <Box>
      <Tooltip title='Options' arrow placement='bottom-end'>
        <IconButton
          onClick={handleOpenUserMenu}
          aria-label='Options Menu'
          sx={{
            display: postDoc.data.userId === currentUser?.uid ? 'in-line' : 'none',
          }}
        >
          <MoreVert fontSize='medium' />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '25px' }}
        id='menu-appbar'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleEdit} aria-label='edit post'>
          <ListItemIcon>
            <Edit />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDelete} aria-label='delete'>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}
export default PostOptions;
