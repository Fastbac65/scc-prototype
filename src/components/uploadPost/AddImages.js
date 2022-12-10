import { Add } from '@mui/icons-material';
import { Box, Fab, Input } from '@mui/material';
import React, { useRef } from 'react';

const AddImages = ({ files, setFiles }) => {
  const fileRef = useRef();

  const handleClick = () => {
    fileRef.current.click();
  };

  const handleChange = (e) => {
    const allFiles = [...files, ...e.target.files];
    console.log(allFiles);

    setFiles(allFiles);
    fileRef.current.value = null; //allows the same file to be uploaded twice
  };

  return (
    <div>
      <Input
        type='file'
        inputRef={fileRef}
        sx={{ display: 'none' }}
        inputProps={{ accept: 'image/jpg, image/png', multiple: true }}
        onChange={handleChange}
      />
      <Fab size='small' color='primary' aria-label='add' onClick={handleClick}>
        <Add />
      </Fab>
    </div>
  );
};

export default AddImages;
