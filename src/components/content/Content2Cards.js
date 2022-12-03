import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ThreeDRotation from '@mui/icons-material/ThreeDRotation';
import Api from '@mui/icons-material/Api';
import IconBloc from '../utils/IconBloc';
import { Button } from '@mui/material';
import CmplxReviewCard from './CmplxReviewCard';
import MediaCardHist from './MediaCardHist';
import { useValue } from '../context/ContextProvider';

const Content2Cards = () => {
  const { theme } = useValue();
  return (
    <Box component='section' sx={{ borderRadius: 0, flexGrow: 1 }} m={1} py={{ xs: 1, md: 2 }}>
      <Grid container spacing={0}>
        <Grid
          item
          sx={{
            borderRadius: 1,
            boxShadow: '4',
            background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)',
          }}
          xs={12}
          sm={5.5}
        >
          <Typography variant='h5' pt={1} m={2}>
            Our Club, Our History
          </Typography>
          <Typography variant='body2' color='text.secondary' m={2} mb={4}>
            The knives seemed to move of their own accord, gliding with a luminous digital display wired to a
            subcutaneous chip. It was chambered for .22 long rifle, and Case would’ve preferred lead azide explosives to
            the Tank War.
          </Typography>
          <Box sx={{ border: 0, display: 'flex', justifyContent: 'center' }}>
            <CmplxReviewCard />
          </Box>
          <Button href='#' sx={{ m: 2 }} size='small'>
            Learn More
          </Button>
        </Grid>
        <Grid item sx={{ ml: 'auto', borderRadius: 1, boxShadow: '4' }} xs={12} sm={6}>
          <Grid container p={1} alignItems='center' justifyContent='space-around'>
            <IconBloc icon={AccessAlarmIcon} />
            <Grid item border={0} p={1} sx={{ width: '80%' }}>
              <Typography variant='body2' color='text.secondary'>
                Our Club was founded in 1918.
                <br />
                There have been no lives lost since the club was founded.
              </Typography>
            </Grid>
          </Grid>
          <Grid container p={1} alignItems='center' justifyContent='space-around'>
            <IconBloc icon={ThreeDRotation} />
            <Grid item border={0} p={1} sx={{ width: '80%' }}>
              <Typography variant='body2' color='text.secondary'>
                As we live, our hearts turn to the sun.
                <br />
                Cause pain is what we go through as we become fitter.
              </Typography>
            </Grid>
          </Grid>
          <Grid container p={1} alignItems='center' justifyContent='space-around'>
            <IconBloc icon={Api} />
            <Grid item border={0} p={1} sx={{ width: '80%' }}>
              <Typography variant='body2' color='text.secondary'>
                Patrolling the beach is critical on busy weekends
                <br />
                South Curlie is beautiful but often quite dangerous.
              </Typography>
            </Grid>
          </Grid>
          <Box m={2} sx={{ border: 0, display: 'flex', justifyContent: 'center' }}>
            <MediaCardHist />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Content2Cards;
