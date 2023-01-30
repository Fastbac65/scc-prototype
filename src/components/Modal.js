import { Close } from '@mui/icons-material';
import { Dialog, DialogTitle, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useValue } from './context/ContextProvider';

const Modal = () => {
  const {
    state: { modal },
    dispatch,
  } = useValue();
  const navigate = useNavigate();

  const handleClose = () => {
    if (modal.title === 'Reset Password') {
      //  a user has just closed the reset password verification windown
      navigate('/');
    }
    dispatch({ type: 'MODAL', payload: { ...modal, open: false } });
  };

  return (
    // removing onClose={handleClose} from Dialog stopped background clicking from closing the modal
    <Dialog sx={{ mx: -4 }} open={modal.open} disableEscapeKeyDown={true} PaperProps={{ elevation: 2 }}>
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
