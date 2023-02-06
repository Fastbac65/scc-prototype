import Content2CardsHist from './content/Content2CardsHist';
import scc1 from '../static/imgs/SRC-1024x718.jpeg';
import scc2 from '../static/imgs/Club-Photo-2-1024x428.jpeg';

import { Box } from '@mui/material';
import { useValue } from './context/ContextProvider';
import RecentPosts from './RecentPosts';
import Content2CardsNippers from './content/Content2CardsNippers';
import Content2CardsNippersTop from './content/Content2CardsNippersTop';

const Nippers = () => {
  const { theme } = useValue();
  return (
    <>
      <Box sx={{ backgroundImage: `url(${scc2}) `, backgroundSize: 'cover' }}>
        <Box sx={{ background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)' }}>
          <Content2CardsNippersTop />
        </Box>
      </Box>
      <Box sx={{ backgroundImage: `url(${scc2}) `, backgroundSize: 'cover' }}>
        <Box sx={{ background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)' }}>
          <Content2CardsNippers />
        </Box>
      </Box>
      {/* <Box sx={{ mb: '1px', backgroundImage: `url(${scc1}) `, backgroundSize: 'cover' }}>
        <Box sx={{ background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)' }}>
          <RecentPosts />
        </Box>
      </Box> */}
    </>
  );
};

export default Nippers;
