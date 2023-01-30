import { Button, Box } from '@mui/material';
import CmplxReviewCard from './CmplxReviewCard';
import MediaCard from './MediaCard';
import Masonry from '@mui/lab/Masonry';
import SimpleActionCard from './SimpleActionCard';

const ContentCardMasonryPosts = () => {
  return (
    <Box component='section' mx={1}>
      <Box pr={{ xs: 0, sm: 2, md: 3 }} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Masonry
          // sx={{ border: '1px dotted red' }}
          columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
          spacing={{ xs: 1 }}
        >
          <SimpleActionCard />
          <MediaCard />
          <CmplxReviewCard />
          <MediaCard />
          <SimpleActionCard />

          <CmplxReviewCard />
          <MediaCard />
          <CmplxReviewCard />
          <MediaCard />
          <SimpleActionCard />
          <MediaCard />
          <CmplxReviewCard />
        </Masonry>
      </Box>
      <Button href='#' sx={{ m: 2 }} size='small'>
        Learn More
      </Button>
      {/* </Grid> */}
      {/* </Grid */}
    </Box>
  );
};

export default ContentCardMasonryPosts;
