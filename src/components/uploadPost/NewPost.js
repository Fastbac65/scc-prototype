import { Box, Button, DialogActions, DialogContent, DialogContentText, Paper, Stack, TextField } from '@mui/material';
import { useRef, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import AddImages from './AddImages';
import PostImagesList from './PostImageList';
import { useValue } from '../context/ContextProvider';

const NewPost = () => {
  const { theme } = useValue();
  const [files, setFiles] = useState([]);

  const titleRef = useRef();
  const subtitleRef = useRef();
  // const summaryRef = useRef();
  const bodyRef = useRef();

  return (
    <form>
      <DialogContent sx={{ pt: 0, px: { xs: 1, sm: 2 }, width: { xs: 300, sm: 350 }, minHeight: 420 }}>
        <Paper elevation={15} sx={{ pt: 0, border: theme.palette.mode === 'dark' ? 0 : 1, borderColor: 'lightgray' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <PostImagesList files={files} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Stack spacing={0} sx={{ width: '92%' }}>
              <TextField
                color='secondary'
                // sx={{ mb: 0 }}
                variant='standard'
                size='small'
                type='text'
                fullWidth
                inputRef={titleRef}
                label='Title'
                required
                multiline
                InputProps={{ style: { fontSize: 20 } }}
              />
              <TextField
                color='secondary'
                sx={{ mb: 1 }}
                variant='standard'
                size='small'
                type='text'
                fullWidth
                inputRef={subtitleRef}
                label='Subtitle or Date'
                required
                InputProps={{ style: { fontSize: 14 } }}
              />
              {/* <TextField size='small' type='text' fullWidth inputRef={summaryRef} label='Summary' required multiline /> */}
              <TextField
                color='secondary'
                sx={{ mb: 3 }}
                variant='standard'
                size='small'
                type='text'
                fullWidth
                inputRef={bodyRef}
                label='Main'
                required
                multiline
                InputProps={{ style: { fontSize: 14 } }}
              />
            </Stack>
          </Box>
        </Paper>

        <DialogActions sx={{ justifyContent: 'center' }}>
          <AddImages files={files} setFiles={setFiles} />

          <Button type='submit' sx={{ borderRadius: 25 }} variant='contained' endIcon={<SendIcon />}>
            Submit
          </Button>
        </DialogActions>
        <DialogContentText variant='caption'>Click on photo to zoom.</DialogContentText>
        <DialogContentText variant='caption'>Add photos or go with the library option.</DialogContentText>
      </DialogContent>
    </form>
  );
};
export default NewPost;
