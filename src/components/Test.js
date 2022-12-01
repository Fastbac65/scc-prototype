import { Close } from '@mui/icons-material';
import { Fab, Tooltip } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { useValue } from './context/ContextProvider';
import CoolLightbox from './imagesList/CoolLightBox';
import ImagesList from './imagesList/ImagesList';
import Options from './imagesList/Options';
import LoadingTest from './LoadingTest';
import Form from './upload/Form';
import ProgressList from './upload/progresslist/ProgressList';
import Upload from './upload/Upload';
import PasswordField from './user/PasswordField';

const CloseLightBox = () => {
  const { theme } = useValue();
  return (
    <div>
      <Tooltip title='Close' arrow placement='bottom'>
        <Fab
          color='primary'
          // onClick={handleClose}
          sx={{
            background: 'none',
            boxShadow: 'none',
            position: 'absoulte',
            // right: 20,
            // bottom: 0,
            zIndex: theme.zIndex.modal + 2,
            '&:hover': {
              // color: ${({ theme }) => theme.pageContentLinkHoverColor};
              color: '#f9de00',
              background: 'none',
            },
          }}
        >
          <Close fontSize='large' />
        </Fab>
      </Tooltip>
    </div>
  );
};

const Test = () => {
  return (
    <Container maxWidth='lg' sx={{ textAlign: 'center', justifyContent: 'center' }}>
      <p>************ Component Test Page *****************</p>
      <LoadingTest />
      <CloseLightBox />

      <Upload />
      <PasswordField />
      {/* <ImagesList /> */}
      {/* <CoolLightbox /> */}
    </Container>
  );
};

export default Test;
