import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import CmplxReviewCard from './CmplxReviewCard';
import MediaCard from './MediaCard';

const CardGrid = () => {
  return (
    <Box sx={{ flexGrow: 1 }} m={2} py={{ xs: 3, md: 6 }}>
      <Grid container spacing={{ xs: 2, md: 3 }}>
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
  );
};

export default CardGrid;
