import { useContext, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
import logo from '../static/imgs/scc-logo-blue-sm2.png';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import GlobalContext from './context/ContextProvider';
import { auth } from './context/FireBase';
import { signOut } from 'firebase/auth';

import Brightness7Icon from '@mui/icons-material/Brightness7';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LoginIcon from '@mui/icons-material/Login';
import CelebrationIcon from '@mui/icons-material/Celebration';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';

function ResponsiveAppBar() {
  const { login, setLogin, theme, toggleColorMode, signOutUser } = useContext(GlobalContext);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const pages = [
    {
      primary: 'Venue Hire',
      icon: <CelebrationIcon />,
      to: '/hire',
      members: true,
    },
    {
      primary: 'Events',
      icon: <LocalActivityIcon />,
      to: '/events',
      members: true,
    },
    {
      primary: 'Posts',
      icon: <NewspaperIcon />,
      to: '/blog',
      members: true,
    },
    {
      primary: 'History',
      icon: <MilitaryTechIcon />,
      to: '/history',
      members: true,
    },
    {
      primary: 'Training',
      icon: <FitnessCenterIcon />,
      to: '/training',
      members: login,
    },
  ];
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
  const navigate = useNavigate();

  // ListItemLink Component
  function ListItemLink(props) {
    const { icon, primary, to } = props;

    return (
      <>
        <ListItem component={RouterLink} to={to}>
          {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
          <ListItemText
            // primaryTypographyProps={{ color: theme.palette.mode === 'dark' ? 'primary.light' : 'primary' }}
            primaryTypographyProps={{ color: theme.palette.mode === 'dark' ? 'text.primary' : 'text.primary' }}
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
    signOutUser().then(() => {
      navigate('/login');
    });
    setAnchorElUser(null);
  };

  return (
    <AppBar sx={{ background: '#004c98' }} enableColorOnDark position='sticky'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
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
          <Box component={RouterLink} to='/'>
            <Box
              ml={-3}
              mr={1}
              component='img'
              src={logo}
              sx={{ height: 70, display: { xs: 'none', sm: 'flex' } }}
            ></Box>
          </Box>
          <Box flexGrow={1} component={RouterLink} to='/'>
            <Box mr={1} component='img' src={logo} sx={{ height: 70, display: { xs: 'flex', sm: 'none' } }}></Box>
          </Box>
          {/* main menu large screen */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
            {pages.map(
              (page) =>
                page.members && (
                  <Button
                    key={page.primary}
                    component={RouterLink}
                    to={page.to}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page.primary}
                  </Button>
                )
            )}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={theme.palette.mode === 'dark' ? 'Light Mode' : 'Dark Mode'} arrow placement='bottom-end'>
              <IconButton sx={{ mr: 2, p: 0 }} onClick={toggleColorMode} color='inherit'>
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <DarkModeOutlinedIcon />}
              </IconButton>
            </Tooltip>

            <Tooltip title='Sign In' arrow placement='bottom-end'>
              <IconButton sx={{ p: 0 }} component={RouterLink} to='/login' color='inherit'>
                {!login ? <LoginIcon /> : null}
              </IconButton>
            </Tooltip>

            <Tooltip title='Settings' arrow placement='bottom-end'>
              <IconButton
                size='small'
                onClick={handleOpenUserMenu}
                sx={{
                  display: login ? 'in-line' : 'none',
                  p: 0,
                }}
              >
                <Avatar alt='Terry Sharp' src='/static/images/avatar/2.jpg' />
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
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign='left'>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
