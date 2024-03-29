import { Link as RouterLink, Outlet } from 'react-router-dom';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Stack, Tooltip } from '@mui/material';
import { useState } from 'react';
import { useValue } from './context/ContextProvider';
import NewPost from './uploadPost/NewPost';
import useFirestore from './context/useFirestore';
import PostsList from './postsList/PostsList';
import { Add, FacebookOutlined, Instagram } from '@mui/icons-material';
import NewSocialPost from './uploadPost/NewSocialPost';
import scc1 from '../static/imgs/scc-fb-grp.jpeg';

export default function Posts() {
  const {
    currentUser,
    theme,
    login,
    dispatch,
    state: { modal },
  } = useValue();

  // const [files, setFiles] = useState([]);
  const [like, setLike] = useState('');
  const [likePostDocs, setLikePostDocs] = useState([]);
  // TODO  move this up a level and pass docs as prop
  const { documents } = useFirestore('Posts');

  // useEffect(() => {
  //   //
  // }, [currentUser?.uPostLikes?.length]);

  const handleFavsClick = () => {
    if (like === 'red') setLike('');
    else setLike('red');

    console.log(currentUser?.uPostLikes);
    if (currentUser?.uPostLikes?.length > 0) {
      let likes = [];
      documents.forEach((doc) => {
        if (currentUser.uPostLikes.indexOf(doc.id) >= 0) {
          likes.push(doc);
        }
      });
      setLikePostDocs(likes);
      console.log('liked posts', likes);
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
      <Box sx={{ backgroundImage: `url(${scc1}) `, backgroundSize: 'cover' }}>
        <Box sx={{ background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)' }}>
          <Box>
            <Outlet context={[documents]} />
          </Box>
        </Box>
      </Box>
      <Box sx={{ backgroundImage: `url(${scc1}) `, backgroundSize: 'cover', minHeight: 800 }}>
        <Box
          sx={{
            background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.5)',
            minHeight: 800,
          }}
        >
          <Box sx={{ pt: 1 }}>
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
                <Tooltip arrow placement='top-start' title='instagram post' enterDelay={2000}>
                  <Fab
                    size='small'
                    color='secondary'
                    aria-label='edit'
                    onClick={() => handleCreateSocialPost('Instagram')}
                  >
                    <Instagram />
                  </Fab>
                </Tooltip>
                <Tooltip arrow placement='top-start' title='facebook post' enterDelay={2000}>
                  <Fab
                    size='small'
                    color='secondary'
                    aria-label='edit'
                    onClick={() => handleCreateSocialPost('Facebook')}
                  >
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
            <PostsList
              documents={like === '' ? documents : likePostDocs}
              // documents={documents}
            />

            {/* <ContentCardMasonryPosts /> */}
          </Box>
        </Box>
      </Box>
    </div>
  );
}
