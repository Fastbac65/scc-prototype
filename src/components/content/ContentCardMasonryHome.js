import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Button, Box } from '@mui/material';
import CmplxReviewCard from './CmplxReviewCard';
import MediaCard from './MediaCard';
import Masonry from '@mui/lab/Masonry';

const ContentCardMasonryHome = () => {
  return (
    <Box component='section' mx={1} mr={3} py={{ xs: 1, md: 1 }}>
      <Grid container>
        <Grid item xs={12} sx={{ borderRadius: 1, boxShadow: '2' }}>
          <Typography variant='h4' pt={1} m={2}>
            South Curl Curl Surf Life Saving Club
          </Typography>
          <Typography variant='body1' color='text' m={2} mb={4}>
            Summer is here, Nippers are off and running and the sand is back!!
          </Typography>
          <Box py={{ xs: 1, md: 1 }}>
            <Masonry
              // sx={{ border: '1px dotted red' }}
              columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
              spacing={{ xs: 1 }}
            >
              <MediaCard />
              <CmplxReviewCard />
              <MediaCard />
              <CmplxReviewCard />
              <MediaCard />
              <CmplxReviewCard />
              <MediaCard />
              <CmplxReviewCard />
            </Masonry>
          </Box>
          <Button href='#' sx={{ m: 2 }} size='small'>
            Learn More
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContentCardMasonryHome;
