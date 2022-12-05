import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Fade from '@mui/material/Fade';

import { useValue } from '../context/ContextProvider';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CmplxReviewCardHist() {
  const [expanded, setExpanded] = useState(false);
  const { imglib, currentUser } = useValue();

  const [like, setLike] = useState();

  const [url, setUrl] = useState(
    ''
    // 'https://firebasestorage.googleapis.com/v0/b/scc-proto.appspot.com/o/images%2Fheader7.jpeg?alt=media&token=9ff47599-4360-4649-bf48-a60730cea6c5'
    // 'https://firebasestorage.googleapis.com/v0/b/scc-proto.appspot.com/o/images%2Fheader5.jpeg?alt=media&token=8acd48ec-9c4c-404b-b242-9031eb2c7a0a'
    // 'https://firebasestorage.googleapis.com/v0/b/scc-proto.appspot.com/o/images%2Fheader4.jpeg?alt=media&token=f2ede123-a80e-468a-bff7-ce5c26d094c9'
    // 'https://firebasestorage.googleapis.com/v0/b/scc-proto.appspot.com/o/images%2Fheader3.jpeg?alt=media&token=fac14bdd-3a36-49f7-ad50-07f414230716'
  );

  useEffect(() => {
    const indx = Math.floor(Math.random() * 8);
    setUrl(imglib[indx]);
  }, [imglib]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLikeClick = () => {
    if (like === 'red') setLike('');
    else setLike('red');
  };

  return (
    <>
      <div>
        <div id='title-element' style={{ position: 'relative' }}>
          <div id='top' style={{ position: 'absolute', top: '-100px' }}></div>
        </div>

        <Fade timeout={500} in={true}>
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Tooltip placement='top' title={currentUser?.displayName}>
                  <Avatar
                    sx={{ bgcolor: red[500] }}
                    src={currentUser?.photoURL}
                    alt={currentUser?.displayName}
                    aria-label={currentUser?.displayName}
                  >
                    {currentUser?.displayName?.charAt(0)}
                  </Avatar>
                </Tooltip>
              }
              action={
                <IconButton aria-label='settings'>
                  <MoreVertIcon />
                </IconButton>
              }
              title='Some SCC History Content'
              subheader='Nov 24th, 2022'
            />
            <CardMedia component='img' height='150' src={url} alt='scc-ocean' />
            <CardContent>
              <Typography variant='body2' color='text.secondary'>
                South Curl Curl has a long and proud history. Our club is 100 years young, with over 1000 members. This
                season we had over 350 nippers register, great to see so many young kids back at the beach.
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton onClick={handleLikeClick} aria-label='add to favorites'>
                <FavoriteIcon sx={{ color: like }} />
              </IconButton>
              <IconButton aria-label='share'>
                <ShareIcon />
              </IconButton>

              <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label='show more'>
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout='auto' unmountOnExit>
              <CardContent>
                <Typography paragraph>What you need to know:</Typography>
                <Typography paragraph>This year there are updates to ART and Bronzies.</Typography>
                <Typography paragraph>
                  A narrow wedge of light from a half-open service hatch framed a heap of discarded fiber optics and the
                  chassis of a skyscraper canyon. They were dropping, losing altitude in a canyon of rainbow foliage, a
                  lurid communal mural that completely covered the hull of the spherical chamber. Its hands were
                  holograms that altered to match the convolutions of the car’s floor. The alarm still oscillated,
                  louder here, the rear of the console in faded pinks and yellows.
                </Typography>
                <Typography paragraph>
                  Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook without
                  stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
                  reserved shrimp and mussels, tucking them down into the rice, and cook again without stirring, until
                  mussels have opened and rice is just tender, 5 to 7 minutes more. (Discard any mussels that don't
                  open.)
                </Typography>
                <Typography>Set aside off of the heat to let rest for 10 minutes, and then serve.</Typography>
                <CardActions disableSpacing>
                  <IconButton onClick={handleLikeClick} aria-label='add to favorites'>
                    <FavoriteIcon sx={{ color: like }} />
                  </IconButton>
                  <IconButton aria-label='share'>
                    <ShareIcon />
                  </IconButton>

                  <ExpandMore
                    href='#top'
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label='show more'
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
              </CardContent>
            </Collapse>
          </Card>
        </Fade>
      </div>
    </>
  );
}
