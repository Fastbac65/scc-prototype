import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ThreeDRotation from '@mui/icons-material/ThreeDRotation';
import Api from '@mui/icons-material/Api';
import IconBloc from '../utils/IconBloc';
import { CardMedia } from '@mui/material';
import { useValue } from '../context/ContextProvider';
import scc1 from '../../static/imgs/scc-party2.jpg';
import HireForm from './HireForm';

const Content2Cards = () => {
  const { theme } = useValue();
  return (
    <Box component='section' sx={{ borderRadius: 0, flexGrow: 1 }} mx={1} py={{ xs: 1, md: 2 }}>
      <Grid container spacing={0}>
        <Grid
          item
          sx={{
            borderRadius: 1,
            boxShadow: '4',
            background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.1)',
          }}
          xs={12}
          sm={6}
        >
          <Typography variant='h5' pt={1} m={2}>
            Book your next party at South Curl Curl
          </Typography>
          <Typography variant='body2' color='text.secondary' m={2} mb={4}>
            Amazing location, stunning panoramic views of entire Curl Curl beach. We offer a unique venue with
            unsurpassed views for weddings, conferences, business meetings, fundraisers, parties or other similar
            functions.
          </Typography>
          <Typography variant='body2' color='text.secondary' m={2} mb={4}>
            Interested?? Please fill out your details below and we'll be back to you ASAP!
          </Typography>
          <HireForm />
          {/* place from here */}
          {/* <Button href='#' sx={{ m: 2 }} size='small'>
            Learn More
          </Button> */}
          <Typography variant='body2' color='text.secondary' m={2} mb={4}>
            Otherwise feel free to drop us an email at scccaretaker@gmail.com or call us on the mobile 0432066292.
          </Typography>
        </Grid>
        <Grid item sx={{ ml: 'auto', borderRadius: 1, boxShadow: '4' }} xs={12} sm={6}>
          <Grid container p={1} alignItems='center' justifyContent='space-around'>
            <IconBloc icon={AccessAlarmIcon} />
            <Grid item border={0} p={1} sx={{ width: '80%' }}>
              <Typography variant='body2' color='text.secondary'>
                Large commercial grade kitchen available for your function.
                <br />
                Ideal for your entertaining.
              </Typography>
            </Grid>
          </Grid>
          <Grid container p={1} alignItems='center' justifyContent='space-around'>
            <IconBloc icon={ThreeDRotation} />
            <Grid item border={0} p={1} sx={{ width: '80%' }}>
              <Typography variant='body2' color='text.secondary'>
                Stylish wooden bar, beautiful tables and stools.
                <br />
                Capacity for up to 120 people. Inside and outside dining.
              </Typography>
            </Grid>
          </Grid>
          <Grid container p={1} alignItems='center' justifyContent='space-around'>
            <IconBloc icon={Api} />
            <Grid item border={0} p={1} sx={{ width: '80%' }}>
              <Typography variant='body2' color='text.secondary'>
                Large, private, outdoor balcony adjoining the hall.
                <br />
                Suitable for outdoor dining and nibbles.
              </Typography>
            </Grid>
          </Grid>
          <Grid container p={1} alignItems='center' justifyContent='space-around'>
            <IconBloc icon={Api} />
            <Grid item border={0} p={1} sx={{ width: '80%' }}>
              <Typography variant='body2' color='text.secondary'>
                Full audio and video facilities for presentations/music.
                <br />
                BBQ facilities available for the duration of your function.
              </Typography>
            </Grid>
          </Grid>
          <Grid container p={1} alignItems='center' justifyContent='space-around'>
            <IconBloc icon={Api} />
            <Grid item border={0} p={1} sx={{ width: '80%' }}>
              <Typography variant='body2' color='text.secondary'>
                Large bar servery area that you are welcome to use.
                <br />
                BYO drinks for you and your guests. Bar service also avilable.
              </Typography>
            </Grid>
          </Grid>
          <Box mx={2} mt={2}>
            <CardMedia component='img' src={scc1} height={150} sx={{ borderRadius: 2 }} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Content2Cards;
