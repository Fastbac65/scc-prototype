import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ThreeDRotation from '@mui/icons-material/ThreeDRotation';
import Api from '@mui/icons-material/Api';
import IconBloc from '../utils/IconBloc';
import { Button, Paper } from '@mui/material';
import { useValue } from '../context/ContextProvider';
import MediaCardNippers from './MediaCardNippers';
import CmplxReviewCardNippersInfo from './CmplxReviewCardNippersInfo';
import CmplxReviewCard from './CmplxReviewCard';
import MediaCard from './MediaCard';
import CalendarPatrol from '../CalendarPatrol';

const Content2CardsPatrol = () => {
  const { theme } = useValue();
  return (
    <>
      <Box component='section' sx={{ borderRadius: 0, flexGrow: 1 }} mx={1} py={{ xs: 1, md: 2 }}>
        <Grid container spacing={0}>
          <Grid
            item
            sx={{
              borderRadius: 1,
              boxShadow: '4',
              background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.3)',
            }}
            xs={12}
            sm={6}
          >
            <Typography variant='h5' pt={1} m={2}>
              Oct 21<sup>st</sup> marks the start of the season.
            </Typography>
            <Typography variant='body2' color='text.secondary' m={2} mb={4}>
              We have a number of great courses coming up and the big one is the new ART course.
            </Typography>
            <Box sx={{ mx: 1, border: 0, display: 'flex', justifyContent: 'center' }}>
              <CmplxReviewCard />
            </Box>
            <Button href='#' sx={{ m: 2 }} size='small'>
              Learn More
            </Button>
          </Grid>
          <Grid
            item
            sx={{
              ml: 'auto',
              borderRadius: 1,
              background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.3)',
              boxShadow: '4',
            }}
            xs={12}
            sm={6}
          >
            <Grid container p={1} alignItems='center' justifyContent='space-around'>
              <IconBloc icon={AccessAlarmIcon} />
              <Grid item border={0} p={1} sx={{ width: '80%' }}>
                <Typography variant='body2' color='text.secondary'>
                  Training Resources
                  <br />
                  Check your e-learning for new proficiencies.
                </Typography>
              </Grid>
            </Grid>
            <Grid container p={1} alignItems='center' justifyContent='space-around'>
              <IconBloc icon={ThreeDRotation} />
              <Grid item border={0} p={1} sx={{ width: '80%' }}>
                <Typography variant='body2' color='text.secondary'>
                  General Information
                  <br />
                  2022/23 Season – Starts 21<sup>st</sup> OCTOBER
                </Typography>
              </Grid>
            </Grid>
            <Grid container p={1} alignItems='center' justifyContent='space-around'>
              <IconBloc icon={Api} />
              <Grid item border={0} p={1} sx={{ width: '80%' }}>
                <Typography variant='body2' color='text.secondary'>
                  Training Officer and Trainers
                  <br />
                  Contact details for the season 2022/2023.
                </Typography>
              </Grid>
            </Grid>
            <Box m={1} sx={{ border: 0, display: 'flex', justifyContent: 'center' }}>
              <MediaCard />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Content2CardsPatrol;
