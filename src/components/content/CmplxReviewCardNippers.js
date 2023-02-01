import { useState, useMemo } from 'react';
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
import scc1 from '../../static/imgs/Rippers.jpeg';

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

const CmplxReviewCardNippers = () => {
  const [expanded, setExpanded] = useState(false);
  const { imglib, currentUser } = useValue();

  const [like, setLike] = useState();

  const [url, setUrl] = useState('');

  useMemo(() => {
    const indx = Math.floor(Math.random() * 8);
    setUrl(imglib[indx]);
  }, []);

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
          <div id='topripper' style={{ position: 'absolute', top: '-100px' }}></div>
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
              title='South Curl Curl Rippers'
              subheader='Rippers 2023.. bigger than ever'
            />
            <CardMedia component='img' height='150' src={scc1} alt='scc-ocean' />
            <CardContent>
              <Typography variant='body2' color='text.secondary'>
                This season we had over 350 nippers register, great to see so many young kids back at the beach. South
                Curl Curl also offers a modified nipper program for children & youth with a disability. The program has
                been developed to allow inclusion for all children & youth aged 5 to 15 and aims to teach the following
                skills...
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
                <Typography variant='body2' paragraph color='text.secondary'>
                  The sessions will also include fun activities such as: beach races, flags, wade and swim races. As
                  members of this group become more confident in the water, they learn skills to be able to use nipper
                  surfboards and catch a wave or two to shore.
                </Typography>
                <Typography variant='body2' paragraph color='text.secondary'>
                  The Rippers group are supported by volunteers from South Curl Curl Surf Lifesaving Club, however
                  family members are actively encouraged to participate with their child so everyone has the opportunity
                  to share in the excitement as each member masters new skills throughout the season.
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  South Curl Curl encourage members of ‘Rippers’ to join in their age mainstream group if they wish and
                  are welcome to participate in both groups. Our main focus is to make sure members are actively
                  learning whilst having fun! The Rippers group runs on Sunday mornings 10-11am. For further information
                  please contact Kirsten Quinn at rippers@southcurlynippers.com
                </Typography>
                <CardActions disableSpacing>
                  <IconButton onClick={handleLikeClick} aria-label='add to favorites'>
                    <FavoriteIcon sx={{ color: like }} />
                  </IconButton>
                  <IconButton aria-label='share'>
                    <ShareIcon />
                  </IconButton>

                  <ExpandMore
                    href='#topripper'
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
};

export default CmplxReviewCardNippers;
