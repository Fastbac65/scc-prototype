import ContentCardMasonry from './content/ContentCardMasonry';
import Content2CardsVenueHire from './content/Content2CardsVenueHire';
import ContentCardMasonryPosts from './content/ContentCardMasonryPosts';
import scc1 from '../static/imgs/scc-party.jpeg';
import scc2 from '../static/imgs/scc-beach-surfers.jpeg';
import { Box } from '@mui/material';
import { useValue } from './context/ContextProvider';

const VenueHire = () => {
  const { theme } = useValue();
  return (
    <>
      <Box sx={{ backgroundImage: `url(${scc1}) `, backgroundSize: 'cover' }}>
        <Box sx={{ background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(200,200,200,0.7)' }}>
          <Content2CardsVenueHire />
        </Box>
      </Box>
      <Box sx={{ backgroundImage: `url(${scc2}) `, backgroundSize: 'cover' }}>
        <Box sx={{ background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(200,200,200,0.7)' }}>
          <ContentCardMasonryPosts />
        </Box>
      </Box>
    </>
  );
};

export default VenueHire;