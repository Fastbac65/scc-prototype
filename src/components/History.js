import Content2CardsHist from './content/Content2CardsHist';
import scc1 from '../static/imgs/Archives-March-Past-1024x669.jpeg';
import { Box } from '@mui/material';
import { useValue } from './context/ContextProvider';
import RecentPosts from './RecentPosts';

const History = () => {
  const { theme } = useValue();
  return (
    <>
      <Box sx={{ backgroundImage: `url(${scc1}) `, backgroundSize: 'cover' }}>
        <Box sx={{ background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.4)' }}>
          <Content2CardsHist />
        </Box>
      </Box>
      {/* <Box sx={{ mb: 2, backgroundImage: `url(${scc1}) `, backgroundSize: 'cover' }}>
        <Box sx={{ background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.2)' }}>
          <RecentPosts />
        </Box>
      </Box> */}
    </>
  );
};

export default History;
