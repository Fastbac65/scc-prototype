import { Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Stack, Tooltip } from '@mui/material';
import { useState } from 'react';
import { useValue } from './context/ContextProvider';
import NewPost from './uploadPost/NewPost';
import useFirestore from './context/useFirestore';
import { Add, FacebookOutlined, Instagram } from '@mui/icons-material';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';

import NewSocialPost from './uploadPost/NewSocialPost';
import RecentPostsList from './postsList/RecentPostsList';

export default function RecentPosts() {
  const {
    currentUser,
    login,
    dispatch,
    state: { modal },
  } = useValue();

  // const [files, setFiles] = useState([]);
  const [like, setLike] = useState('');
  const [likePostDocs, setLikePostDocs] = useState([]);
  // TODO  move this up a level and pass docs as prop
  const { documents } = useFirestore('Posts');

  const handleFavsClick = () => {
    if (like === 'red') setLike('');
    else setLike('red');

    if (currentUser?.uPostLikes?.length > 0) {
      let likes = [];
      documents.forEach((doc) => {
        if (currentUser.uPostLikes.indexOf(doc.id) >= 0) {
          likes.push(doc);
        }
      });
      setLikePostDocs(likes);
    }
  };

  const handleCreateSocialPost = (type) => {
    dispatch({
      type: 'MODAL',
      payload: { ...modal, open: true, title: 'Create Social Post', content: <NewSocialPost type={type} /> },
    });
  };

  const handleCreatePost = () => {
    dispatch({ type: 'MODAL', payload: { ...modal, open: true, title: 'Create Post', content: <NewPost /> } });
  };
  // console.log(documents);

  return (
    <div>
      <Box sx={{ borderRadius: 0, pt: 3 }}>
        {login && (
          <Stack spacing={1} direction='row' sx={{ display: 'flex', justifyContent: 'center' }}>
            <Tooltip arrow placement='top-start' title='home' enterDelay={2000}>
              <Fab size='small' component={RouterLink} to='/' color='primary' aria-label='add'>
                <HomeIcon />
              </Fab>
            </Tooltip>
            <Tooltip arrow placement='top-start' title='add post' enterDelay={2000}>
              <Fab size='small' color='secondary' aria-label='edit' onClick={handleCreatePost}>
                <Add />
              </Fab>
            </Tooltip>
            <Tooltip arrow placement='top-start' title='..all posts' enterDelay={2000}>
              <Fab component={RouterLink} to='/posts' size='small' color='secondary' aria-label='see all posts'>
                <DynamicFeedIcon />
              </Fab>
            </Tooltip>
            <Tooltip arrow placement='top-start' title='instagram post' enterDelay={2000}>
              <Fab size='small' color='secondary' aria-label='edit' onClick={() => handleCreateSocialPost('Instagram')}>
                <Instagram />
              </Fab>
            </Tooltip>
            <Tooltip arrow placement='top-start' title='facebook post' enterDelay={2000}>
              <Fab size='small' color='secondary' aria-label='edit' onClick={() => handleCreateSocialPost('Facebook')}>
                <FacebookOutlined />
              </Fab>
            </Tooltip>
            <Tooltip arrow placement='top-start' title='favourites' enterDelay={2000}>
              <Fab color='secondary' id='favourite' size='small' aria-label='like' onClick={handleFavsClick}>
                <FavoriteIcon sx={{ color: like }} />
              </Fab>
            </Tooltip>
          </Stack>
        )}
        <RecentPostsList documents={like === '' ? documents : likePostDocs} />
      </Box>
    </div>
  );
}
