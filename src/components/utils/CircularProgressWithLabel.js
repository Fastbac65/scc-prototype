import { CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';

const CircularProgressWithLabel = ({ value }) => {
  return (
    <Box>
      <CircularProgress variant={'determinate'} thickness={3.6} value={value} sx={{ color: '#f9de00' }} />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant='caption' component='div' color='white' fontSize='1rem'>
          {value + '%'}
        </Typography>
      </Box>
    </Box>
  );
};
export default CircularProgressWithLabel;
