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
import CmplxReviewCardNippersInfo from './CmplxReviewCardNippersInfo';
import CmplxReviewCardMembers1 from './CmplxReviewCardMembers1';
import CmplxReviewCardMembers2 from './CmplxReviewCardMembers2';

const ContentMembers = () => {
  const { theme } = useValue();
  return (
    <Box component='section' mx={1} py={{ xs: 1, md: 2 }}>
      <Typography variant='h5' pt={1} m={2}>
        Welcome to South Curl Curl Members Area
      </Typography>
      <Typography variant='body2' color='text.secondary' m={2} mb={4}>
        All our member specific information is here and not necessarily public facing.
      </Typography>
      <Box sx={{ mx: 1, display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CmplxReviewCardMembers1 />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CmplxReviewCardMembers2 />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ContentMembers;
