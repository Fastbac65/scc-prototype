import { useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { ButtonGroup, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useValue } from './context/ContextProvider';

import Brightness7Icon from '@mui/icons-material/Brightness7';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LoginIcon from '@mui/icons-material/Login';
import CelebrationIcon from '@mui/icons-material/Celebration';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import logo from '../static/imgs/scc-logo-blue-sm2.png';

import Profile from './user/Profile';
import AccountSettings from './user/AccountSettings';
import { Logout, Photo, Settings } from '@mui/icons-material';

function ResponsiveAppBar() {
  const {
    currentUser,
    login,
    theme,
    toggleColorMode,
    signOutUser,
    state: { modal },
    dispatch,
  } = useValue();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  let location = useLocation();

  const editProfile = () => {
    dispatch({ type: 'MODAL', payload: { ...modal, open: true, title: 'Update Profile', content: <Profile /> } });
  };

  const accountSettings = () => {
    dispatch({
      type: 'MODAL',
      payload: { ...modal, open: true, title: 'Update Account', content: <AccountSettings /> },
    });
  };

  const pages = [
    {
      primary: 'Venue Hire',
      icon: <CelebrationIcon />,
      to: '/hire',
      color: location.pathname === '/hire' ? '#f9de00' : 'white',
      members: true,
    },

    {
      primary: 'Nippers',
      icon: <BeachAccessIcon />,
      to: '/nippers',
      color: location.pathname === '/nippers' ? '#f9de00' : 'white',

      members: true,
    },

    {
      primary: 'Competitors',
      icon: <FitnessCenterIcon />,
      to: '/gallery',
      color: location.pathname === '/gallery' ? '#f9de00' : 'white',

      members: true,
    },

    {
      primary: 'Patrol',
      icon: <EmojiFlagsIcon />,
      to: '/patrol',
      color: location.pathname === '/patrol' ? '#f9de00' : 'white',

      members: login,
    },
    {
      primary: 'Members',
      icon: <CardMembershipIcon />,
      to: '/members',
      color: location.pathname === '/members' ? '#f9de00' : 'white',

      members: login,
    },
    {
      primary: 'History',
      icon: <MilitaryTechIcon />,
      to: '/history',
      color: location.pathname === '/history' ? '#f9de00' : 'white',

      members: true,
    },
  ];

  // ListItemLink Component
  function ListItemLink(props) {
    const { icon, primary, to } = props;

    return (
      <>
        <ListItem component={RouterLink} to={to}>
          {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
          <ListItemText
            // primaryTypographyProps={{ color: theme.palette.mode === 'dark' ? 'primary.light' : 'primary' }}
            primaryTypographyProps={{ color: 'text.primary' }}
            primary={primary}
          />
        </ListItem>
      </>
    );
  }
  ListItemLink.propTypes = {
    icon: PropTypes.element,
    primary: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);
  return (
    <>
      <AppBar sx={{ background: '#004c98' }} enableColorOnDark>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            {/* nav menu small screens */}
            <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
              <IconButton
                size='large'
                aria-label='menu items'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', sm: 'none' },
                }}
              >
                {pages.map(
                  (page) =>
                    page.members && (
                      <MenuItem key={page.primary} onClick={handleCloseNavMenu}>
                        <ListItemLink primary={page.primary} to={page.to} icon={page.icon} />
                        {/* <Typography textAlign='center'>{page.primary}</Typography> */}
                      </MenuItem>
                    )
                )}
              </Menu>
            </Box>
            {/* logo large screen */}
            <Box component={RouterLink} to='/'>
              <Box
                ml={-3}
                mr={-1}
                component='img'
                src={logo}
                sx={{ height: 60, display: { xs: 'none', sm: 'flex' } }}
              ></Box>
            </Box>
            {/* logo small screen */}
            <Box
              component={RouterLink}
              to='/'
              sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' }, justifyContent: 'center' }}
            >
              <Box mr={1} component='img' src={logo} sx={{ height: 60 }}></Box>
            </Box>
            {/* main menu large screen */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', sm: 'flex' },
                flexWrap: 'nowrap',
                justifyContent: 'center',
                // overflow: 'hidden',
              }}
            >
              {pages.map(
                (page) =>
                  page.members && (
                    <Button
                      size='small'
                      key={page.primary}
                      component={RouterLink}
                      to={page.to}
                      onClick={handleCloseNavMenu}
                      sx={{ mx: 0.25, color: page.color, display: 'block', whiteSpace: 'nowrap' }}
                    >
                      {page.primary}
                    </Button>
                  )
              )}
            </Box>
            {/* night mode and login/avatar area */}
            <Box sx={{ display: 'flex', flexGrow: 0, flexWrap: 'nowrap' }}>
              <Tooltip title={theme.palette.mode === 'dark' ? 'Light Mode' : 'Dark Mode'} arrow placement='bottom-end'>
                <IconButton sx={{ mr: 2, p: 0 }} onClick={toggleColorMode} color='inherit'>
                  {theme.palette.mode === 'dark' ? (
                    <Brightness7Icon sx={{ color: '#f9de00' }} />
                  ) : (
                    <DarkModeOutlinedIcon />
                  )}
                </IconButton>
              </Tooltip>

              <Tooltip title='Sign In' arrow placement='bottom-start'>
                <IconButton
                  sx={{
                    p: 0,
                    display: !currentUser ? 'in-line' : 'none',
                  }}
                  component={RouterLink}
                  to='/login'
                  color='inherit'
                >
                  <LoginIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title='Settings' arrow placement='bottom-end'>
                <IconButton
                  size='small'
                  onClick={handleOpenUserMenu}
                  sx={{
                    display: currentUser ? 'in-line' : 'none',
                    p: 0,
                  }}
                >
                  <Avatar
                    sx={{ bgcolor: '#f9de00', color: 'black' }}
                    src={currentUser?.photoURL}
                    alt={currentUser?.displayName}
                    aria-label='user settings'
                  >
                    {currentUser?.displayName?.charAt(0)}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
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
                onClick={handleCloseUserMenu}
              >
                <MenuItem onClick={editProfile}>
                  <ListItemIcon>
                    <Photo fontSize='small' />
                  </ListItemIcon>
                  <Typography textAlign='left'>Profile</Typography>
                </MenuItem>

                <MenuItem onClick={accountSettings}>
                  <ListItemIcon>
                    <Settings fontSize='small' />
                  </ListItemIcon>
                  <Typography textAlign='left'>My Account</Typography>
                </MenuItem>

                <MenuItem onClick={signOutUser}>
                  <ListItemIcon>
                    <Logout fontSize='small' />
                  </ListItemIcon>
                  <Typography textAlign='left'>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Offset />
    </>
  );
}
export default ResponsiveAppBar;
