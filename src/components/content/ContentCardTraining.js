import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CmplxReviewCard from './CmplxReviewCard';
import MediaCard from './MediaCard';
import { ScrollTop } from '../context/ContextProvider';
import { Fab } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';
import CalendarDefault from '../CalendarDefault';
import CalendarPatrol from '../CalendarPatrol';

const ContentCardTraining = () => {
  return (
    <div>
      <div id='back-to-top-anchor'></div>

      <Box component='section'>
        <Grid container>
          <Grid item xs={12} sx={{ border: 0, borderRadius: 1, boxShadow: '4' }}>
            <Typography variant='h4' pt={1} m={2}>
              Training & Upcoming Activities
            </Typography>
            <Typography variant='body1' color='text' m={2} mb={0}>
              The latest from our clubies and nippers
            </Typography>
            <Box m={1} py={{ xs: 1, md: 2 }}>
              <Grid container spacing={{ xs: 1 }}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <MediaCard />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <CmplxReviewCard />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body1' color='text' m={2} mb={0}>
                    The latest from our clubies and nippers
                  </Typography>
                  <CalendarPatrol />
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <MediaCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <CmplxReviewCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <MediaCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <CmplxReviewCard />
                </Grid>
              </Grid>
            </Box>
            <Button href='#back-to-top-anchor' sx={{ m: 2 }} size='small'>
              Learn More
            </Button>
          </Grid>
        </Grid>
        <ScrollTop id='#back-to-top-anchor'>
          <Fab size='small' aria-label='scroll back to top'>
            <KeyboardArrowUp />
          </Fab>
        </ScrollTop>
      </Box>
    </div>
  );
};

export default ContentCardTraining;
