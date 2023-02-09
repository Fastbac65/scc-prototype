import { Box, Fab, Typography } from '@mui/material';
import { ScrollTop, useValue } from './context/ContextProvider';
import Content2CardsPatrol from './content/Content2CardsPatrol';
import scc2 from '../static/imgs/scc-flags.jpeg';
import PatrolRoster from './content/PatrolRoster';
import { KeyboardArrowUp } from '@mui/icons-material';

const Patrol = () => {
  const { theme } = useValue();
  return (
    <>
      <div id='patrol-top'></div>
      <Box sx={{ backgroundImage: `url(${scc2}) `, backgroundSize: 'cover' }}>
        <Box sx={{ py: 2, background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)' }}>
          <Typography variant='h5' mx={2}>
            All your 2023/2024 Patrol and Training information..
          </Typography>
        </Box>
        <Box sx={{ background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)' }}>
          <Content2CardsPatrol />
        </Box>
      </Box>
      <Box sx={{ backgroundImage: `url(${scc2}) `, backgroundSize: 'cover' }}>
        <Box sx={{ background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)' }}>
          <PatrolRoster />
        </Box>
      </Box>

      <ScrollTop id='#patrol-top'>
        <Fab size='small' aria-label='scroll back to top'>
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop>

      {/* <Box sx={{ mb: '1px', backgroundImage: `url(${scc2}) `, backgroundSize: 'cover' }}>
        <Box sx={{ background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)' }}>
          <RecentPosts />
        </Box>
      </Box> */}
    </>
  );
};

export default Patrol;
