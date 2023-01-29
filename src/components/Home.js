import Content2Cards from './content/Content2Cards';
import { Box } from '@mui/material';
import scc1 from '../static/imgs/scc-fb-grp.jpeg';
import { useValue } from './context/ContextProvider';
import { ImageCarousel } from './content/ImageCarousel';
import ContentCardMasonryPosts from './content/ContentCardMasonryPosts';
import PostsList from './postsList/PostsList';
import Posts from './Posts';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#f0f0f0',
//   ...theme.typography.body2,
//   padding: theme.spacing(2),

//   color: theme.palette.text.secondary,
// }));

function Home() {
  const { theme } = useValue();
  return (
    <>
      <Box sx={{ backgroundImage: `url(${scc1}) `, backgroundSize: 'cover' }}>
        <Box sx={{ background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.2)' }}>
          <ImageCarousel />
        </Box>
      </Box>
      <Box sx={{ backgroundImage: `url(${scc1}) `, backgroundSize: 'cover' }}>
        <Box sx={{ background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.2)' }}>
          <Posts />
        </Box>
      </Box>
      <Box sx={{ backgroundImage: `url(${scc1}) `, backgroundSize: 'cover' }}>
        <Box sx={{ background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.2)' }}>
          <Content2Cards />
        </Box>
      </Box>
    </>
  );
}

export default Home;
