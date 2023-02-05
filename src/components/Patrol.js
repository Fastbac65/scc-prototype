import Content2CardsHist from './content/Content2CardsHist';
import { Box, Typography } from '@mui/material';
import { useValue } from './context/ContextProvider';
import Content2CardsPatrol from './content/Content2CardsPatrol';
import scc2 from '../static/imgs/scc-flags.jpeg';
import RecentPosts from './RecentPosts';
import PatrolRoster from './content/PatrolRoster';

const Patrol = () => {
  const { theme } = useValue();
  return (
    <>
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

      {/* <Box sx={{ mb: '1px', backgroundImage: `url(${scc2}) `, backgroundSize: 'cover' }}>
        <Box sx={{ background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)' }}>
          <RecentPosts />
        </Box>
      </Box> */}
    </>
  );
};

export default Patrol;
