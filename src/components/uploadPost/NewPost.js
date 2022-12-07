import { Button, DialogActions, DialogContent, DialogContentText, TextField } from '@mui/material';
import { useRef } from 'react';
import UploadImages from './UploadImages';
import SendIcon from '@mui/icons-material/Send';

const NewPost = () => {
  const titleRef = useRef();
  const subtitleRef = useRef();
  const summaryRef = useRef();
  const bodyRef = useRef();

  return (
    <form>
      <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <UploadImages />
      </DialogActions>
      <DialogContent>
        <DialogContentText>Please fill out required fields</DialogContentText>
        <TextField size='small' type='text' fullWidth inputRef={titleRef} label='Title' required />
        {/* <TextField size='small' type='text' fullWidth inputRef={subtitleRef} label='Subtitle' required /> */}
        {/* <TextField size='small' type='text' fullWidth inputRef={summaryRef} label='Summary' required multiline /> */}
        <TextField size='small' type='text' fullWidth inputRef={bodyRef} label='Main' required multiline />
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button type='submit' sx={{ borderRadius: 25 }} variant='contained' endIcon={<SendIcon />}>
          Submit
        </Button>
      </DialogActions>
    </form>
  );
};
export default NewPost;
