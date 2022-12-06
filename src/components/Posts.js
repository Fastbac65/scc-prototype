import { Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';

import ContentCardMasonryPosts from './content/ContentCardMasonryPosts';
import { Stack } from '@mui/material';
import { useState } from 'react';
import { useValue } from './context/ContextProvider';
import NewPost from './uploadPost/NewPost';

export default function Posts() {
  const {
    currentUser,
    dispatch,
    state: { alert, modal },
  } = useValue();

  const [files, setFiles] = useState([]);
  const [like, setLike] = useState('');

  const handleLikeClick = () => {
    if (like === 'red') setLike('');
    else setLike('red');
  };

  const handleCreatePost = () => {
    // dispatch({ type: 'MODAL', payload: { ...modal, open: true, title: 'Create Post', content: <NewPost /> } });
  };

  return (
    <div>
      <Box sx={{ borderRadius: 0, pt: 3 }}>
        <Stack spacing={1} direction='row' sx={{ display: 'flex', justifyContent: 'center' }}>
          <Fab size='small' component={RouterLink} to='/' color='primary' aria-label='add'>
            <HomeIcon />
          </Fab>
          <Fab size='small' color='secondary' aria-label='edit' onClick={handleCreatePost}>
            <EditIcon />
          </Fab>
          <Fab color='secondary' id='favourite' size='small' aria-label='like' onClick={handleLikeClick}>
            <FavoriteIcon sx={{ color: like }} />
          </Fab>
        </Stack>

        <ContentCardMasonryPosts />
      </Box>
    </div>
  );
}
