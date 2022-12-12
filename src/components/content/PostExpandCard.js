import { useState } from 'react';
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

import Fade from '@mui/material/Fade';

import { useValue } from '../context/ContextProvider';
import { ImageList, ImageListItem } from '@mui/material';
import moment from 'moment';
import PostOptions from '../uploadPost/PostOptions';

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

export default function PostExpandCard({ doc, setOpen, setCurrentImageIndex, setImages }) {
  const [expanded, setExpanded] = useState(false);
  const { currentUser } = useValue();

  const [like, setLike] = useState();

  // const [images, setImages] = useState([]);

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

        <Fade timeout={100} in={true}>
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
              action={<PostOptions postDoc={doc} />}
              title={doc.data?.title}
              subheader={doc.data?.subtitle}
            />
            <ImageList
              gap={1}
              sx={{ width: 'auto', height: 'auto', maxHeight: 301, maxWidth: 350 }} // height 301 allows for 1px gap so no scroll bars show up
              rowHeight={150}
              // cols={layout[files.length - 1]}
              cols={doc.data.images.length == 1 ? 1 : 2}
            >
              {doc.data.images.map((image, indx) => (
                <ImageListItem key={image.src}>
                  <CardMedia
                    component='img'
                    height='150'
                    src={image.src}
                    alt={image.alt}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                      setCurrentImageIndex(indx);
                      setImages(doc.data?.images);
                      setOpen(true);
                    }}
                  />
                  {indx === 0 && (
                    <Typography
                      variant='caption'
                      component='span'
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        color: 'white',
                        bgcolor: 'rgba(0,0,0,0.3)',
                        p: '3px',
                        borderBottomRightRadius: 10,
                      }}
                    >
                      {moment(doc?.data?.timestamp?.toDate()).fromNow()}
                    </Typography>
                  )}
                  {indx === 1 && doc.data.images.length > 4 && (
                    <Typography
                      variant='caption'
                      component='span'
                      sx={{
                        position: 'absolute',
                        right: 0,
                        Top: 0,
                        color: 'white',
                        bgcolor: 'rgba(0,0,0,0.3)',
                        p: '3px',
                        borderBottomLeftRadius: 10,
                      }}
                    >
                      {`+${doc.data.images.length - 4} photos`}
                    </Typography>
                  )}
                </ImageListItem>
              ))}
            </ImageList>

            <CardContent>
              <Typography variant='body2' color='text.primary'>
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

              {doc.data.main.length > 1 && (
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label='show more'
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              )}
            </CardActions>
            <Collapse in={expanded} timeout='auto' unmountOnExit>
              <CardContent>
                {doc.data.main.map(
                  (
                    paragraf,
                    indx // being explicit not to confuse with Typography paragraph prop
                  ) => (
                    <Typography key={indx} variant='body2' paragraph color='text.secondary'>
                      {
                        indx !== 0 && paragraf // skip first paragraf as its alreay above
                      }
                    </Typography>
                  )
                )}
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
