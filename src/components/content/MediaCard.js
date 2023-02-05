import GlobalContext from '../context/ContextProvider';
import { useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
// import Skeleton from '@mui/material/Skeleton';

// import { getDownloadURL } from 'firebase/storage';

export default function MediaCard() {
  const { imglib } = useContext(GlobalContext);
  const [url, setUrl] = useState(
    // 'https://firebasestorage.googleapis.com/v0/b/scc-proto.appspot.com/o/images%2Fheader7.jpeg?alt=media&token=9ff47599-4360-4649-bf48-a60730cea6c5'
    //'https://firebasestorage.googleapis.com/v0/b/scc-proto.appspot.com/o/images%2Fheader5.jpeg?alt=media&token=8acd48ec-9c4c-404b-b242-9031eb2c7a0a'
    //'https://firebasestorage.googleapis.com/v0/b/scc-proto.appspot.com/o/images%2Fheader4.jpeg?alt=media&token=f2ede123-a80e-468a-bff7-ce5c26d094c9'
    'https://firebasestorage.googleapis.com/v0/b/scc-proto.appspot.com/o/images%2Fheader3.jpeg?alt=media&token=fac14bdd-3a36-49f7-ad50-07f414230716'
  );

  // useEffect(() => {
  //   const indx = Math.floor(Math.random() * 8);
  //   setUrl(imglib[indx]);
  // }, [imglib]);

  return (
    <>
      <Fade timeout={700} in={true}>
        <Card sx={{ maxWidth: 550 }}>
          <CardMedia id='gimg' component='img' height='140' image={url} alt='rowing' />
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
