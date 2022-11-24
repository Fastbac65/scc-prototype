import { Grid } from '@mui/material';
import React from 'react';

const IconBloc = ({ icon: Icon }) => {
  return (
    <Grid
      item
      border={0}
      sx={{
        width: '3rem',
        height: '3rem',
        bgcolor: 'info.main',
        alignItems: 'center',
        borderRadius: 1,
        justifyContent: 'center',
        display: 'flex',
      }}
    >
      <Icon sx={{ fontWeight: 'normal', fontSize: '1.5rem', color: '#fff' }} />
    </Grid>
  );
};

export default IconBloc;
