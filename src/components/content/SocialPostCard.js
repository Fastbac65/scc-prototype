import { memo, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

import Fade from '@mui/material/Fade';

import { InstagramEmbed, FacebookEmbed } from 'react-social-media-embed';

import PostOptions from '../uploadPost/PostOptions';
import updateUserRecords from '../context/updateUserRecords';
import { useValue } from '../context/ContextProvider';
import { DialogContent, Paper } from '@mui/material';

function SocialPostCard({ socialUrl }) {
  // const { login } = useValue();

  // const [like, setLike] = useState('');
  // const [embedToggle, setEmbedToggle] = useState(true);
  // const socialUrl = 'https://www.instagram.com/p/CmVLatKPpip/';

  // useEffect(() => {
  //   //
  //   if (user) {
  //     let like = user?.uPostLikes?.indexOf(doc.id) >= 0 ? 'red' : '';
  //     setLike(like);
  //     // console.log('setLikes initialised');
  //   }

  //   // setTimeout(() => {
  //   //   setEmbedToggle(true);
  //   // }, 100);
  // }, []);

  // const handleLikeClick = () => {
  //   if (like === 'red') {
  //     setLike('');
  //     let newLikes = { uPostLikes: [...user.uPostLikes] };
  //     newLikes.uPostLikes.splice(newLikes.uPostLikes.indexOf(doc.id), 1);
  //     console.log(newLikes);
  //     Object.assign(user, newLikes); // updates the currentUser object in memory
  //     updateUserRecords('Users', user.uid, newLikes)
  //       .then((result) => console.log('User post likes updated', result))
  //       .catch((error) => console.log('Error updated user roles', error));
  //   } else {
  //     setLike('red');
  //     let newLikes = {};
  //     if (user?.uPostLikes?.length > 0) {
  //       newLikes = { uPostLikes: [doc.id, ...user?.uPostLikes] };
  //       let userUpdateObj = Object.assign(user, newLikes);

  //       console.log(newLikes);
  //     } else {
  //       newLikes = { uPostLikes: [doc.id] };
  //       console.log(newLikes);
  //       let userUpdateObj = Object.assign(user, newLikes);
  //       console.log(userUpdateObj);

  //       // setCurrentUser(authUser);
  //       // setCurrentUser(user);
  //     }
  //     updateUserRecords('Users', user.uid, newLikes)
  //       .then((result) => console.log('User post likes updated', result))
  //       .catch((error) => console.log('Error updated user roles', error));

  //     console.log(user);
  //   }
  // };

  return (
    <Paper
      elevation={24}
      sx={{
        py: 0,
        px: 0,
        // width: { xs: 350, sm: 'auto' },
        maxWidth: 380,
        minWidth: 328,
      }}
      // sx={{ px: 0, pt: 0, border: theme.palette.mode === 'dark' ? 0 : 1, borderColor: 'lightgray' }}
    >
      <div></div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {socialUrl.includes('instagram') && <InstagramEmbed url={socialUrl} width={'100%'} captioned />}
        {socialUrl.includes('facebook') && <FacebookEmbed url={socialUrl} width={'100%'} />}
      </div>
      {/* <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Stack spacing={0} sx={{ width: '92%' }}>
            <TextField
              color='secondary'
              sx={{ mb: 3 }}
              variant='standard'
              size='small'
              type='text'
              fullWidth
              inputRef={captionRef}
              label='Add a reaction.. ❤️💕😂👍🏽'
              required
              multiline
              InputProps={{ style: { fontSize: 14 } }}
            />
          </Stack>
         </Box> */}
    </Paper>

    // <Card sx={{ display: 'flex', maxWidth: 380, minWidth: 328 }}>
    //   <CardHeader
    //     avatar={
    //       <Tooltip placement='top' title={doc.data?.uName}>
    //         <Avatar
    //           sx={{ bgcolor: red[500] }}
    //           src={doc.data?.uAvatar}
    //           alt={doc.data?.uName}
    //           aria-label={doc.data?.uName}
    //         >
    //           {doc.data?.uName?.charAt(0)}
    //         </Avatar>
    //       </Tooltip>
    //     }
    //     action={<PostOptions postDoc={doc} />}
    //     title={doc.data?.title}
    //     subheader={doc.data?.subtitle}
    //   />
    //   {doc.data?.postType === 'Instagram' && embedToggle && (
    //     <InstagramEmbed url={doc.data?.postUrl} width={'100%'} retryDelay={1000} />
    //   )}
    //   <CardContent>
    //     <Typography variant='body2' color='text.primary'>
    //       {doc.data?.caption}
    //     </Typography>
    //   </CardContent>
    //   <CardActions disableSpacing sx={{ py: 0 }}>
    //     {login && (
    //       <>
    //         <IconButton onClick={handleLikeClick} aria-label='add to favorites'>
    //           <FavoriteIcon sx={{ color: like }} />
    //         </IconButton>
    //         <IconButton aria-label='share'>
    //           <ShareIcon />
    //         </IconButton>
    //       </>
    //     )}
    //   </CardActions>
    // </Card>
  );
}

export default memo(SocialPostCard);
