import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Button, Box } from '@mui/material';
import CmplxReviewCard from './CmplxReviewCard';
import MediaCard from './MediaCard';
import Masonry from '@mui/lab/Masonry';
import SimpleActionCard from './SimpleActionCard';

const ContentCardMasonryHome = () => {
  return (
    <Box component='section' mx={1}>
      <Grid container>
        <Grid item xs={12} sx={{ borderRadius: 1, boxShadow: 0 }}>
          <Typography variant='h4' pt={1} m={2}>
            South Curl Curl Surf Life Saving Club
          </Typography>
          <Typography variant='body1' color='text' m={2} mb={4}>
            Summer is here, Nippers are on and the sand is back on our beautiful beach!!
          </Typography>
          <Box pr={{ xs: 0, sm: 2, md: 3 }} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Masonry
              // sx={{ border: '1px dotted red' }}
              columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
              spacing={{ xs: 1 }}
            >
              <MediaCard />
              <SimpleActionCard />
              <CmplxReviewCard />
              <MediaCard />
              <SimpleActionCard />
              <CmplxReviewCard />
              <MediaCard />
              <CmplxReviewCard />
              <SimpleActionCard />
              <MediaCard />
              <CmplxReviewCard />
            </Masonry>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContentCardMasonryHome;
