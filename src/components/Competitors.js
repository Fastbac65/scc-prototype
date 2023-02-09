import { Link as RouterLink, Outlet, Route, Routes } from 'react-router-dom';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import HomeIcon from '@mui/icons-material/Home';
import { Stack, Tooltip, Typography } from '@mui/material';
import { useValue } from './context/ContextProvider';
import RowingIcon from '@mui/icons-material/Rowing';
import PoolIcon from '@mui/icons-material/Pool';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { FitnessCenter } from '@mui/icons-material';
import scc1 from '../static/imgs/scc-pool-waves.jpeg';

export default function Competitors() {
  const {
    currentUser,
    theme,
    login,
    dispatch,
    state: { modal },
  } = useValue();

  return (
    <div>
      {/* <Box sx={{ backgroundImage: `url(${scc1}) `, backgroundSize: 'cover' }}> */}
      <Box sx={{ background: theme.palette.mode === 'dark' ? '#242e3b' : '#d8e0ea' }}>
        <Box sx={{ borderRadius: 0, pt: 3 }}>
          <Stack spacing={1} direction='row' sx={{ display: 'flex', justifyContent: 'center' }}>
            <Tooltip arrow placement='top-start' title='home' enterDelay={100}>
              <Fab size='small' component={RouterLink} to='/' color='primary' aria-label='add'>
                <HomeIcon />
              </Fab>
            </Tooltip>
            <Tooltip arrow placement='top-start' title='boaties' enterDelay={100}>
              <Fab
                component={RouterLink}
                to='/competitors/boaties'
                size='small'
                color='secondary'
                aria-label='rowing team'
              >
                <RowingIcon />
              </Fab>
            </Tooltip>
            <Tooltip arrow placement='top-start' title='swimming club' enterDelay={100}>
              <Fab
                component={RouterLink}
                to='/competitors/swimmers'
                size='small'
                color='secondary'
                aria-label='swimming club'
              >
                <PoolIcon />
              </Fab>
            </Tooltip>
            <Tooltip arrow placement='top-start' title='championship lifesavers' enterDelay={100}>
              <Fab
                component={RouterLink}
                to='/competitors/champs'
                size='small'
                color='secondary'
                aria-label='championship life savers'
              >
                <DirectionsRunIcon />
              </Fab>
            </Tooltip>
            <Tooltip arrow placement='top-start' title='gym' enterDelay={100}>
              <Fab size='small' color='secondary' aria-label='gym'>
                <FitnessCenter />
              </Fab>
            </Tooltip>
          </Stack>
          <Box component='section' mx={0}>
            <Typography variant='h4' pt={1} mx={2}>
              All our competitor News, Info & Upcoming Competitions
            </Typography>
            <Typography variant='h6' color='text' mx={2} mb={1}>
              ..from our swimmers, boaties and championship lifesavers
            </Typography>

            <Outlet />

            {/* <Typography variant='h6' py={1} mx={2}>
            Recent Competitor Posts
          </Typography>
          <RecentPosts /> */}
            <Box pr={{ xs: 0, sm: 2, md: 3 }} sx={{ display: 'flex', justifyContent: 'center' }}></Box>
          </Box>
        </Box>
      </Box>
      {/* </Box> */}
    </div>
  );
}
