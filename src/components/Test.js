import { Close } from '@mui/icons-material';
import { Box, Fab, Tooltip } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { ImageCarousel } from './content/ImageCarousel';
import SimpleActionCard from './content/SimpleActionCard';
import { useValue } from './context/ContextProvider';

import scc1 from '../static/imgs/scc-fb-grp.jpeg';
import ImageResize from './context/ImageResize';

const Test = () => {
  const { theme } = useValue();
  return (
    <>
      <Container maxWidth='lg' sx={{ textAlign: 'center', justifyContent: 'center' }}>
        <Box sx={{ backgroundImage: `url(${scc1})` }}>
          <Box sx={{ background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.2)' }}>
            <p>************ Component Test Page *****************</p>
            <ImageResize />
            {/* <SimpleActionCard /> */}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Test;
