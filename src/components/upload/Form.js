import { Add } from '@mui/icons-material';
import { Fab, Input } from '@mui/material';
import React, { useRef } from 'react';

const Form = () => {
  const fileRef = useRef();
  // const input = document.querySelector('input');
  // if (input) input.style.display = 'none';

  const handleClick = async () => {
    fileRef.current.click();
    console.log(fileRef.current.value);
  };

  return (
    <form>
      <input
        className='imgup'
        type='file'
        multiple
        ref={fileRef}
        accept='.jpg, .png'
        // inputProps={{ accept: 'image/jpg, image/png', multiple: '' }}
      />
      {/* <Input
        type='file'
        multiple
        // inputRef={fileRef}
        // sx={{ display: 'none' }}
        // inputProps={{ accept: 'image/jpg, image/png', multiple: '' }}
      /> */}
      <Fab color='primary' aria-label='add' onClick={handleClick}>
        <Add fontSize='large' />
      </Fab>
    </form>
  );
};

export default Form;
