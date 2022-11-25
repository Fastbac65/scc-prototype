import { useContext, useEffect } from 'react';
import GlobalContext from './context/ContextProvider';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';

//breadcrumb path
const PathTracker = () => {
  const location = useLocation();
  const { user, login, toggleLogin, theme, toggleColorMode } = useContext(GlobalContext);
  return (
    <>
      {/* <Paper sx={{ borderRadius: 0 }}> */}
      <Typography variant='body2' sx={{ pb: 2, flexGrow: 1 }} color='text.secondary'>
        Current route: {location.pathname}
        <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color='inherit'>
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <DarkModeOutlinedIcon />}
        </IconButton>
        {theme.palette.mode} mode
        {!login && (
          <Button size='small' variant='contained' onClick={toggleLogin}>
            Log In
          </Button>
        )}
        {login && (
          <Button size='small' variant='contained' onClick={toggleLogin}>
            Log Out
          </Button>
        )}
        {user ? ` - ${user.displayName} ${user.email}` : null}
      </Typography>
      {/* </Paper> */}
    </>
  );
};

export default PathTracker;
