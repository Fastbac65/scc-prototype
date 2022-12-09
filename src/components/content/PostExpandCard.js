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

export default function PostExpandCard({ doc }) {
  const [expanded, setExpanded] = useState(false);
  const { currentUser } = useValue();

  const [like, setLike] = useState();

  const [images, setImages] = useState([]);

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
          <div id={doc.id} style={{ position: 'absolute', top: '-100px' }}></div>
        </div>

        <Fade timeout={500} in={true}>
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Tooltip placement='top' title={doc.data?.uName}>
                  <Avatar
                    sx={{ bgcolor: red[500] }}
                    src={doc.data?.uAvatar}
                    alt={doc.data?.uName}
                    aria-label={doc.data?.uName}
                  >
                    {doc.data?.uName?.charAt(0)}
                  </Avatar>
                </Tooltip>
              }
              action={
                <IconButton aria-label='settings'>
                  <MoreVertIcon />
                </IconButton>
              }
              title={doc.data?.title}
              subheader={doc.data?.subtitle}
            />
            <CardMedia component='img' height='150' src={doc.data?.images[0].src} alt={doc.data?.images[0]} />
            <CardContent>
              <Typography variant='body2' color='text.secondary'>
                {doc.data?.main[0]}
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
                  {doc.data?.main[1]}
                </Typography>
                <Typography variant='body2' paragraph color='text.secondary'>
                  {doc.data?.main[2]}
                </Typography>
                <Typography variant='body2' paragraph color='text.secondary'>
                  {doc.data?.main[3]}
                </Typography>
                <Typography variant='body2' paragraph color='text.secondary'>
                  {doc.data?.main[3]}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton onClick={handleLikeClick} aria-label='add to favorites'>
                  <FavoriteIcon sx={{ color: like }} />
                </IconButton>
                <IconButton aria-label='share'>
                  <ShareIcon />
                </IconButton>

                <ExpandMore
                  href={`#${doc.id}`}
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label='show more'
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
            </Collapse>
          </Card>
        </Fade>
      </div>
    </>
  );
}
