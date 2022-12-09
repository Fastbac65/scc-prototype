import ContentCardMasonry from './content/ContentCardMasonry';
import Content2Cards from './content/Content2Cards';
import ContentCardMasonryPosts from './content/ContentCardMasonryPosts';
import scc1 from '../static/imgs/Archives-March-Past-1024x669.jpeg';
import { Box } from '@mui/material';
import { useValue } from './context/ContextProvider';
import Posts from './Posts';

const History = () => {
  const { theme } = useValue();
  return (
    <>
      <Box sx={{ backgroundImage: `url(${scc1}) `, backgroundSize: 'cover' }}>
        <Box sx={{ background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.2)' }}>
          <Content2Cards />
          <Posts />
        </Box>
      </Box>
    </>
  );
};

export default History;
