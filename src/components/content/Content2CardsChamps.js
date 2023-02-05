import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ThreeDRotation from '@mui/icons-material/ThreeDRotation';
import Api from '@mui/icons-material/Api';
import IconBloc from '../utils/IconBloc';
import { Button } from '@mui/material';
import { useValue } from '../context/ContextProvider';
import MediaCardNippers from './MediaCardNippers';
import CmplxReviewCardChampsInfo from './CmplxReviewCardChampsInfo';

const Content2CardsChamps = () => {
  const { theme } = useValue();
  return (
    <Box component='section' sx={{ borderRadius: 0, flexGrow: 1 }} mx={1} py={{ xs: 1, md: 2 }}>
      <Grid container spacing={0}>
        <Grid
          item
          sx={{
            borderRadius: 1,
            boxShadow: '4',
            background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)',
          }}
          xs={12}
          sm={6}
        >
          <Typography variant='h5' pt={1} m={2}>
            Welcome to South Curl Curl Championship Life Savers
          </Typography>
          <Typography variant='body2' color='text.secondary' m={2} mb={4}>
            The best place to be on a Sunday morning, maximum fun and the highest level of competitive and water safety
            training for our little ones.
          </Typography>
          <Box sx={{ mx: 1, border: 0, display: 'flex', justifyContent: 'center' }}>
            <CmplxReviewCardChampsInfo />
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
            background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)',
            boxShadow: '4',
          }}
          xs={12}
          sm={6}
        >
          <Grid container p={1} alignItems='center' justifyContent='space-around'>
            <IconBloc icon={AccessAlarmIcon} />
            <Grid item border={0} p={1} sx={{ width: '80%' }}>
              <Typography variant='body2' color='text.secondary'>
                Results and competitive calendar
                <br />
                Perth 2023
              </Typography>
            </Grid>
          </Grid>
          <Grid container p={1} alignItems='center' justifyContent='space-around'>
            <IconBloc icon={ThreeDRotation} />
            <Grid item border={0} p={1} sx={{ width: '80%' }}>
              <Typography variant='body2' color='text.secondary'>
                General Information
                <br />
                2022/23 Competition schedule
              </Typography>
            </Grid>
          </Grid>
          <Grid container p={1} alignItems='center' justifyContent='space-around'>
            <IconBloc icon={Api} />
            <Grid item border={0} p={1} sx={{ width: '80%' }}>
              <Typography variant='body2' color='text.secondary'>
                Boaties Captians
                <br />
                Contact details for the season 2022/2023.
              </Typography>
            </Grid>
          </Grid>
          <Box m={1} sx={{ border: 0, display: 'flex', justifyContent: 'center' }}>
            <MediaCardNippers />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Content2CardsChamps;
