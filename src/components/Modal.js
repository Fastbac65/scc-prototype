import { Close } from '@mui/icons-material';
import { Box, Dialog, DialogTitle, IconButton } from '@mui/material';
import { useValue } from './context/ContextProvider';

const Modal = () => {
  const {
    state: { modal },
    dispatch,
  } = useValue();

  const handleClose = () => {
    dispatch({ type: 'MODAL', payload: { ...modal, open: false } });
  };

  return (
    <Dialog open={modal.open} onClose={handleClose} PaperProps={{ elevation: 2 }}>
      <DialogTitle sx={{ pb: 0 }}>
        {modal.title}
        <IconButton
          aria-label='Close'
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      {modal.content}
    </Dialog>
  );
};
export default Modal;
