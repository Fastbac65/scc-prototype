import { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';

import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { ListItemIcon, ListItemText } from '@mui/material';
import { useValue } from '../context/ContextProvider';

import { Delete, Edit, MoreVert } from '@mui/icons-material';
import deleteDocument from '../context/deleteDocument';
import deleteFile from '../context/deleteFile';
import { doc } from 'firebase/firestore';

function PostOptions({ postDoc }) {
  const collectionName = 'Posts';

  const {
    login,
    currentUser,
    state: { alert },
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
      const postImageDeletePromises = [];

      if (postDoc.data.images.length) {
        // should never be zero but just in case of bug

        const notLibrary = postDoc.data.images[0].src.split(currentUser.uid)[1]; // if it is from library then 'library' will be undefined
        if (notLibrary) {
          postDoc.data.images.forEach(async (image) => {
            const postImageName = image.src.split(currentUser.uid + '%2F')[1].split('?')[0]; // strip the filename from the URL
            const filePath = collectionName.toLowerCase() + '/' + currentUser.uid + '/' + postImageName; // storage file path
            console.log(filePath);
            postImageDeletePromises.push(deleteFile(filePath)); // all deletes go almost in parallel so we dont await them
          });
          await Promise.all(postImageDeletePromises); // we await all promises from the delete requests
        }
      }
      //check if the first image is from the library - we just check if
      await deleteDocument(collectionName, postDoc.id);
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
        <MenuItem onClick={handleDelete} aria-label='delete'>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
        <MenuItem /*onClick={handleEdit}*/ aria-label='edit post'>
          <ListItemIcon>
            <Edit />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}
export default PostOptions;
