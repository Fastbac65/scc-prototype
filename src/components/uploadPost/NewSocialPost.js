import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
} from '@mui/material';
import { useRef, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { useValue } from '../context/ContextProvider';
import { uuidv4 } from '@firebase/util';
import { addDocument } from '../context/addDocument';
import { InstagramEmbed } from 'react-social-media-embed';
import { Send } from '@mui/icons-material';

const NewSocialPost = () => {
  const {
    theme,
    currentUser,
    dispatch,
    state: { alert, modal },
  } = useValue();
  const [socialUrl, setSocialUrl] = useState('');
  const [embedToggle, setEmbedToggle] = useState(false);
  // const [socialUrl, setSocialUrl] = useState('https://www.instagram.com/p/Cex6dmIvbPe/');
  const urlRef = useRef('');
  const captionRef = useRef('');
  const collectionName = 'SocialPosts';
  // const storageName = 'posts';
  const postDocumentId = currentUser?.uid + '_' + uuidv4();
  const date = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const defaultDate = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();

  const handleSubmitPost = async (e) => {
    e.preventDefault();

    let caption = captionRef.current.value;

    dispatch({ type: 'START_LOADING' });
    try {
      // update database collection 'Posts'
      const postDocumentObj = {
        userId: currentUser?.uid || '',
        uName: currentUser?.displayName || '',
        uEmail: currentUser?.email || currentUser?.providerData[0]?.email || '',
        uAvatar: currentUser?.photoURL || '',
        uMobile: currentUser?.phoneNumber || '',
        albumName: collectionName,
        postType: 'Instagram',
        postUrl: socialUrl,
        title: '',
        subtitle: defaultDate,
        caption: caption,
        tags: {},
        likes: 0,
      };
      await addDocument(collectionName, postDocumentObj, postDocumentId); // also adds timestamp automatically
    } catch (error) {
      console.log(error.message);
    }

    dispatch({ type: 'END_LOADING' });
    dispatch({ type: 'MODAL', payload: { ...modal, open: false } });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        ...alert,
        open: true,
        severity: 'success',
        message: 'Your new social post has been created succesfully!!',
        duration: 5000,
      },
    });
  };
  // console.log(files);
  const handleClickShowSocial = () => {
    setEmbedToggle(false);
    setSocialUrl(urlRef.current.value);

    setTimeout(() => {
      setEmbedToggle(true);
    }, 100);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmitPost}>
      <DialogContent sx={{ pt: 0, px: { xs: 0, sm: 1 }, width: { xs: 350, sm: 450 }, minHeight: 300 }}>
        <DialogActions sx={{ my: 0, justifyContent: 'space-around' }}>
          <TextField
            color='secondary'
            // defaultValue={'Please paste your instagram URL here'}
            sx={{ mb: 3 }}
            variant='standard'
            size='small'
            type='text'
            fullWidth
            inputRef={urlRef}
            label='Instagram URL'
            required
            multiline
            // InputProps={{ style: { fontSize: 14 } }}
            InputProps={{
              style: { fontSize: 14 },
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowSocial}
                    onMouseDown={handleMouseDown}
                    edge='end'
                  >
                    <Send />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogActions>
        <Paper
          elevation={15}
          sx={{ px: 0, pt: 0, border: theme.palette.mode === 'dark' ? 0 : 1, borderColor: 'lightgray' }}
        >
          {embedToggle && <InstagramEmbed url={socialUrl} width={'100%'} captioned />}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
          </Box>
        </Paper>

        <DialogActions sx={{ my: 2, justifyContent: 'space-around' }}>
          {/* <AddImages files={files} setFiles={setFiles} /> */}

          <Button
            disabled={true}
            type='submit'
            size='small'
            sx={{ borderRadius: 25 }}
            variant='contained'
            endIcon={<SendIcon />}
          >
            Post
          </Button>
        </DialogActions>
        <DialogContentText variant='caption'>Browse to your social post and copy URL</DialogContentText>
        <DialogContentText variant='caption'>Add optional caption on SCC website</DialogContentText>
      </DialogContent>
    </form>
  );
};
export default NewSocialPost;
