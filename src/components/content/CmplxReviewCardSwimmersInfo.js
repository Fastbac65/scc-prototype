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
import scc1 from '../../static/imgs/Ocean-Swim-001-OceanSwim-1024x683.jpeg';

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

const CmplxReviewCardSwimmersInfo = () => {
  const [expanded, setExpanded] = useState(false);
  const {  currentUser } = useValue();

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
          <div id='nippers1' style={{ position: 'absolute', top: '-100px' }}></div>
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
              title='South Curl Curl Swimming Club 2023/2024'
              subheader='General Information for the upcoming season'
            />
            <CardMedia component='img' height='150' src={scc1} alt='scc-ocean' />
            <CardContent>
              <Typography variant='body2' color='text.secondary'>
                All members will need to join or renew via the SLS Members Portal.
                <br />
                <br />
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                To process memberships we need an online application, payment and ID for all new members. Please supply
                ID to mail@southcurlcurlslsc.org and use the{' '}
                <a href='https://members.sls.com.au/SLSA_Online/modules/login/index.php' target='_blank'>
                  SLS Members Portal
                </a>{' '}
                to join the club or renew your membership. Renewing members please note – take the Create Account
                pathway and it will advise if you already have an account and from there you can have user name and
                passwords reset...
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
                  <h3>Age Group Staggered Start Session Times</h3>
                  <p>8am &#8211; 9am Cadets (U15-17)</p>
                  <p>8.45 &#8211; 9.45am U6, U7 &amp; U8</p>
                  <p>10-11am U9 – U13</p>
                  <p>10am &#8211; 11am &#8216;Rippers&#8217; All Ability Group</p>
                  <p>Find your age marker on the beach and line up ready for some fun!!!</p>
                  <h3>Download the SCCSLSC Team App to keep up to date with all the latest information.</h3>
                  <p>
                    1. Download Team App to your smartphone from the Apple App Store or Google Play. Create an
                    email-based login and associated password (remember this for future use).
                  </p>
                  <p>2. Search for &#8216;South Curl Curl SLSC&#8217; or &#8216;SCCSLSC&#8217;</p>
                  <p>3. Register for South Curl Curl Surf Life Saving Club</p>
                  <p>
                    Note &#8211; to access the App through a computer (i.e. not on your phone/tablet), paste the
                    following link into your browser: https://sccslsc.teamapp.com/
                  </p>
                  <p>
                    4. Select all of the relevant groups to join e.g. U6s, U11s etc Where relevant also select
                    &#8216;Bronze&#8217;, &#8216;Age Manager&#8217; or &#8216;Official&#8217; if relevant (these ones
                    require validation to join)
                  </p>
                  <p>
                    For further tips and tricks re the App, check out the Nippers Handbook{' '}
                    <a
                      href='https://southcurlcurlslsc.org/wp-content/uploads/2018/09/Nippers-Information-Booklet-Season-18_19-v2-11092018.pdf'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      here
                    </a>
                  </p>
                </Typography>

                <CardActions disableSpacing>
                  <IconButton onClick={handleLikeClick} aria-label='add to favorites'>
                    <FavoriteIcon sx={{ color: like }} />
                  </IconButton>
                  <IconButton aria-label='share'>
                    <ShareIcon />
                  </IconButton>

                  <ExpandMore
                    href='#nippers1'
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

export default CmplxReviewCardSwimmersInfo;
