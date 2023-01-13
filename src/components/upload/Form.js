import { Add } from '@mui/icons-material';
import { Box, Fab, Input, Tooltip } from '@mui/material';
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
        <Tooltip followCursor arrow placement='top-start' title='add photos' enterDelay={1000}>
          <Fab size='small' color='primary' aria-label='add' onClick={handleClick}>
            <Add />
          </Fab>
        </Tooltip>
      </form>
    </Box>
  );
};

export default Form;
