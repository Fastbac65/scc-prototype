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
import scc1 from '../../static/imgs/header7.jpeg';

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

export default function CmplxReviewCard() {
  const [expanded, setExpanded] = useState(false);
  const { currentUser } = useValue();

  const [like, setLike] = useState();

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
          <div id='crc1' style={{ position: 'absolute', top: '-100px' }}></div>
        </div>

        <Fade timeout={500} in={true}>
          <Card sx={{ maxWidth: 550 }}>
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
              title='Profiencies and 2022 Update'
              subheader='September 18, 2022'
            />
            <CardMedia component='img' height='150' src={scc1} alt='scc-ocean' />
            <CardContent>
              <Typography variant='body2' color='text.secondary'>
                None of that prepared him for the arena, the crowd, the tense hush, the towering puppets of light from a
                half-open service hatch framed.
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
                    href='#crc1'
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
