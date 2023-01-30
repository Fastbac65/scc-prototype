import { Link as RouterLink } from 'react-router-dom';
import { Add, Collections } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';

import { Box, Fab, Input, Stack, Tooltip } from '@mui/material';
import React, { useRef } from 'react';

const Form = ({ setFiles }) => {
  // const Form = ({ setFiles }) => {
  // const [files, setFiles] = useState([]);
  const fileRef = useRef();

  const handleClick = () => {
    fileRef.current.click();

    console.log('form:', fileRef.current.value);
  };

  const handleChange = (e) => {
    setFiles([...e.target.files]);
    console.log('form change:', e.target.files);
    fileRef.current.value = null; //allows the same file to be uploaded twice
  };

  return (
    <Box sx={{ pt: 2 }}>
      <form>
        <Input
          type='file'
          inputRef={fileRef}
          sx={{ display: 'none' }}
          inputProps={{ accept: 'image/*', multiple: true }}
          onChange={handleChange}
        />
        <Stack spacing={1} direction='row' sx={{ display: 'flex', justifyContent: 'center' }}>
          <Tooltip arrow placement='top-start' title='home' enterDelay={2000}>
            <Fab size='small' component={RouterLink} to='/' color='primary' aria-label='add'>
              <HomeIcon />
            </Fab>
          </Tooltip>

          <Tooltip followCursor arrow placement='top-start' title='add photos' enterDelay={1000}>
            <Fab size='small' color='secondary' aria-label='add' onClick={handleClick}>
              <Add />
            </Fab>
          </Tooltip>
          <Tooltip arrow placement='top-start' title='view posts' enterDelay={2000}>
            <Fab component={RouterLink} to='/posts' size='small' color='secondary' aria-label='see all posts'>
              <DynamicFeedIcon />
            </Fab>
          </Tooltip>
          <Tooltip arrow placement='top-start' title='favourites' enterDelay={2000}>
            <Fab color='secondary' id='favourite' size='small' aria-label='like'>
              <FavoriteIcon />
            </Fab>
          </Tooltip>
        </Stack>
      </form>
    </Box>
  );
};

export default Form;
