import { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import GlobalContext from './context/ContextProvider';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';

//breadcrumb path
const PathTracker = () => {
  const location = useLocation();
  const { currentUser, login, toggleLogin, theme, toggleColorMode } = useContext(GlobalContext);
  console.log('path', currentUser);
  return (
    <>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Typography variant='body2' sx={{ pb: 2, flexGrow: 1 }} color='text.secondary'>
          Current route: {location.pathname}
          <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color='inherit'>
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <DarkModeOutlinedIcon />}
          </IconButton>
          {theme.palette.mode} mode
          {!login && (
            <Button sx={{ ml: 4 }} size='small' variant='contained' onClick={toggleLogin}>
              Log In
            </Button>
          )}
          {login && (
            <Button sx={{ ml: 4 }} size='small' variant='contained' onClick={toggleLogin}>
              Log Out
            </Button>
          )}
          <Button sx={{ ml: 4 }} size='small' variant='contained' component={RouterLink} to='/test'>
            Test
          </Button>
          {currentUser
            ? ` - ${currentUser.displayName} ${currentUser?.email || currentUser?.providerData[0]?.email}`
            : null}
        </Typography>
      </Box>
    </>
  );
};

export default PathTracker;
