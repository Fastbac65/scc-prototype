import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Fab, Tooltip } from '@mui/material';
import { useValue } from '../context/ContextProvider';

const CloseLightBox = () => {
  const { dispatch, theme } = useValue();

  const handleClose = () => {
    dispatch({ type: 'CLOSE_LIGHTBOX' });
  };

  return (
    <Box
      sx={{
        // width: '100%',
        // height: '100%',
        position: 'absolute',
        top: 20,
        // bottom: 40,
        left: 20,
        // ml: '-20px',
        // right: 0,

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // border: 1,
        // borderColor: 'red',
      }}
    >
      <Tooltip enterDelay={2000} title='Close' placement='right'>
        <Fab
          size='small'
          color='primary'
          onClick={handleClose}
          sx={{
            background: 'none',
            boxShadow: 'none',
            zIndex: theme.zIndex.modal + 2,
            '&:hover': {
              color: '#f9de00',
              background: 'none',
            },
          }}
        >
          <ArrowBackIcon fontSize='medium' />
        </Fab>
      </Tooltip>
    </Box>
  );
};
// const backDrop = {
//   position: 'absolute',
//   top: 0,
//   bottom: 0,
//   left: 0,
//   right: 0,
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   background: 'rgba(0,0,0,0.5)',
// };

export default CloseLightBox;
