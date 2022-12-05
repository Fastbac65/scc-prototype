import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Button, Box } from '@mui/material';
import CmplxReviewCard from './CmplxReviewCard';
import MediaCard from './MediaCard';
import Masonry from '@mui/lab/Masonry';
import SimpleActionCard from './SimpleActionCard';

const ContentCardMasonryPosts = () => {
  return (
    <Box component='section' mx={1}>
      {/* <Grid container> */}
      {/* <Grid item xs={12} sx={{ borderRadius: 1, boxShadow: 0 }}> */}
      <Typography variant='h4' pt={1} mx={2}>
        Our Recent Posts & Upcoming Activities
      </Typography>
      <Typography variant='body1' color='text' m={2} mb={4}>
        The latest from our members, boaties and nippers
      </Typography>
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
