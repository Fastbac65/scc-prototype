import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';

import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { ListItemIcon, ListItemText } from '@mui/material';
import GlobalContext from '../context/ContextProvider';

import { Delete, Edit, MoreVert } from '@mui/icons-material';
import deleteDocument from '../context/deleteDocument';
import deleteFile from '../context/deleteFile';

function Options({ collectionName, imageId }) {
  const { login, theme } = useContext(GlobalContext);
  const currentUser = { uid: 'td' };
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDelete = async () => {
    //delete
    try {
      const filePath = collectionName.toLowerCase() + '/' + currentUser.uid + '/' + imageId;
      console.log(filePath);
      await deleteDocument(collectionName, imageId);

      await deleteFile(filePath);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Box>
        <Tooltip title='Options' arrow placement='bottom-end'>
          <IconButton
            onClick={handleOpenUserMenu}
            sx={{
              display: login ? 'in-line' : 'none',
              p: 0,
              position: 'absolute',
              top: 10,
              right: 10,
              background: 'rgb(0,0,0,.3)',
              color: 'white',
            }}
          >
            <MoreVert fontSize='large' />
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
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <Delete />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
          <MenuItem /*onClick={handleDelete}*/>
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
}
export default Options;
