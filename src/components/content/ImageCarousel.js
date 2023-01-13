import Carousel from 'react-material-ui-carousel';
import { Paper, Button, CardMedia, Box, Typography } from '@mui/material';

import img2 from '../../static/imgs/header2.jpeg';
import img3 from '../../static/imgs/header3.jpeg';
import img4 from '../../static/imgs/header4.jpeg';
import img5 from '../../static/imgs/header5.jpeg';
import img7 from '../../static/imgs/header7.jpeg';
import img8 from '../../static/imgs/header8.jpeg';
import { useState } from 'react';

export function ImageCarousel(props) {
  var items = [
    {
      src: img4,
      description: 'What ever!',
    },
    {
      src: img2,
      description: 'Hello World!',
    },
    {
      src: img3,
      description: 'Hello Terry!',
    },
    {
      src: img5,
      description: 'Hello Terry!',
    },
    {
      src: img7,
      description: 'Hello Terry!',
    },
    {
      src: img8,
      description: 'Hello Terry!',
    },
  ];
  //fix
  const [loaded, setLoaded] = useState(true);
  const PreloadImg = () => {
    return (
      <img
        src={items[0].src}
        onLoad={() => {
          setLoaded(true);
        }}
        // style={{ display: 'none' }}
      />
    );
  };

  return (
    <>
      <Box mx={2} pt={4}>
        <Typography textAlign='center' variant='h4' m={2}>
          South Curl Curl Surf Life Saving Club
        </Typography>
        <Typography textAlign='center' variant='body1' color='text' m={2} mb={4}>
          Summer is here, Nippers are on and the sand is back on our beautiful beach!!
        </Typography>
        {/* <PreloadImg /> */}

        {loaded && (
          <Carousel interval={6000} duration={4000} height={250} autoPlay={true} sx={{ borderRadius: 2 }}>
            {items.map((item, i) => (
              <Item key={i} item={item} />
            ))}
          </Carousel>
        )}
        <Box sx={{ background: 'rgba(0,0,0,0.2)', borderRadius: 2 }}>
          <Typography
            color='white'
            textAlign='center'
            variant='body1'
            py={3}
            mt={1}
            mx={2}
            sx={{ background: 'rgba()' }}
          >
            South Curl Curl Surf Life Saving Club has been in existence since 1909 and no lives have been lost whilst
            the beach has been patrolled. The Club places great emphasis on training club members in life saving skills
            to ensure this tradition is maintained. The South Curl Curl Surf Life Saving Club is a volunteer
            organisation whose basic objective is to provide the highest possible level of water safety for our locals,
            visitors and nippers.
          </Typography>
        </Box>
      </Box>
    </>
  );
}

function Item(props) {
  return (
    <Box>
      <CardMedia height={250} component='img' alt='' src={props.item.src} />
    </Box>
  );
}
