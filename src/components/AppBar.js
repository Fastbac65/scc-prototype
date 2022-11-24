import React from 'react';
import AppBarBase from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { createTheme, useTheme } from '@mui/material/styles';

const FullList = () => {
  return (
    <List>
      <ListItem textAlign={'center'}>
        <ListItemText>Home</ListItemText>
      </ListItem>
      <ListItem textAlign={'center'}>
        <ListItemText>Page 1</ListItemText>
      </ListItem>
      <ListItem textAlign={'center'}>
        <ListItemText>Page 2</ListItemText>
      </ListItem>
      <ListItem textAlign={'center'}>
        <ListItemText>About</ListItemText>
      </ListItem>
    </List>
  );
};

export default function AppBar() {
  const theme = useTheme();

  const [isOpen, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    setState(open);
  };

  return (
    <React.Fragment>
      <AppBarBase enableColorOnDark position='relative'>
        <Toolbar>
          <Typography variant='h6' color='inherit'>
            Title
          </Typography>
          <IconButton color='inherit' aria-label='Open drawer' ml={'auto'} onClick={toggleDrawer(!isOpen)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBarBase>
      <Drawer
        variant='temporary'
        anchor='left'
        open={isOpen}
        onClose={toggleDrawer(false)}
        sx={{ marginTop: theme.mixins.toolbar.minHeight, zIndex: theme.zIndex.appBar }}
      >
        <FullList />
      </Drawer>
    </React.Fragment>
  );
}
