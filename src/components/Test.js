import { Close } from '@mui/icons-material';
import { Box, Fab, Tooltip } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { ImageCarousel } from './content/ImageCarousel';
import SimpleActionCard from './content/SimpleActionCard';
import { useValue } from './context/ContextProvider';

import scc1 from '../static/imgs/scc-fb-grp.jpeg';
import ImageResize from './context/ImageResize';

import { initializeApp, deleteApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import axios from 'axios';

const Test = () => {
  const { theme, currentUser } = useValue();

  const [image, setImage] = useState('');

  const profile = 'https://www.instagram.com/aungko_r/channel/?__a=1&__d=dis';

  const url =
    'https://192.168.0.220:5001/image/https://instagram.fsyd8-1.fna.fbcdn.net/v/t51.2885-19/319599394_1294096694657733_2010438183614683485_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fsyd8-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=rG5yve9ilk4AX-eKxl-&edm=AAWvnRQBAAAA&ccb=7-5&oh=00_AfByVYXlCZAQxpB6_aUoniBIP8kbTNXrmAK0Rx7167Rx4A&oe=63B7BB51&_nc_sid=e7738c';

  https: return (
    <>
      <Container maxWidth='lg' sx={{ textAlign: 'center', justifyContent: 'center' }}>
        <Box sx={{ backgroundImage: `url(${scc1})` }}>
          <Box sx={{ background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.2)' }}>
            <p>************ Component Test Page *****************</p>

            <div>
              <img src={url} />
            </div>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Test;
