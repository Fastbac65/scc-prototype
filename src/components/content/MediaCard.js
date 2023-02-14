import GlobalContext from '../context/ContextProvider';
import { useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import scc1 from '../../static/imgs/header3.jpeg';
// import Skeleton from '@mui/material/Skeleton';

// import { getDownloadURL } from 'firebase/storage';

export default function MediaCard() {
  return (
    <>
      <Fade timeout={700} in={true}>
        <Card sx={{ maxWidth: 550 }}>
          <CardMedia id='gimg' component='img' height='140' image={scc1} alt='rowing' />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              North Curly Carnival
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Amazin performances across the board as our under 19's and masters killed it. Our champion lifesavers also
              came away with wins in this and that division.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size='small'>Share</Button>
            <Button size='small'>Learn More</Button>
          </CardActions>
        </Card>
      </Fade>
    </>
  );
}
