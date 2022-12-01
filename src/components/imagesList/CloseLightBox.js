import { Close } from '@mui/icons-material';
import { Box, Fab, Tooltip } from '@mui/material';
import { useValue } from '../context/ContextProvider';

const CloseLightBox = () => {
  const { dispatch, theme } = useValue();

  const handleClose = () => {
    dispatch({ type: 'CLOSE_LIGHTBOX' });
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Tooltip title='Close' arrow placement='right'>
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
          <Close fontSize='large' />
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default CloseLightBox;
