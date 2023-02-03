import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import CalendarPatrol from '../CalendarPatrol';
import { useValue } from '../context/ContextProvider';

const PatrolRoster = () => {
  const { theme } = useValue();

  return (
    <div>
      <Box component='section' sx={{ borderRadius: 0, boxShadow: '4' }} mx={1} py={{ xs: 1, md: 2 }}>
        <Typography variant='h4' pt={1} m={2}>
          Patrol Roster
        </Typography>

        <Box m={1} py={{ xs: 1, md: 2 }}>
          <Paper
            elevation={4}
            sx={{
              p: 1,
              background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(250,250,250,0.6)',
            }}
          >
            <CalendarPatrol />
          </Paper>
        </Box>
        <Box sx={{ m: 2 }}>
          <a
            href='https://southcurlcurlslsc.org/wp-content/uploads/2022/12/SCC-2022-2023-PATROLS-as-at13Dec22notel.pdf'
            target='_blank'
            style={{ color: theme.palette.mode === 'dark' ? theme.palette.info.main : theme.palette.primary.main }}
          >
            Full Roster as of 13<sup>th</sup> Dec/2022
          </a>
        </Box>
      </Box>
    </div>
  );
};
export default PatrolRoster;
