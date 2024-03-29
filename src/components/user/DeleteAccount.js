import { Button, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useValue } from '../context/ContextProvider';
import { deleteUser } from 'firebase/auth';
import deleteUserFiles from '../context/deleteUserFiles';

const DeleteAccount = () => {
  const {
    dispatch,
    currentUser,
    state: { alert, modal },
  } = useValue();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'START_LOADING' });
    try {
      await deleteUserFiles(['Posts', 'Gallery', 'Users'], currentUser);
      console.log('user Posts and Gallery items deleted..  trying to delete account');
      await deleteUser(currentUser);
      console.log('user account deleted..');

      dispatch({ type: 'MODAL', payload: { ...modal, open: false } });
      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          ...alert,
          open: true,
          severity: 'success',
          message: 'Account succesfully deleted!',
          duration: 8000,
        },
      });
    } catch (error) {
      console.log('deleteaccount', error.message, error);
      dispatch({
        type: 'UPDATE_ALERT',
        payload: { ...alert, open: true, severity: 'error', message: error.message, duration: 4000 },
      });
    }

    dispatch({ type: 'END_LOADING' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <DialogContentText paragraph>
          Are you sure you want to detete your account. This action will delete all your files and content on South Curl
          Curl SLSC website.
        </DialogContentText>
        <DialogContentText variant='h6'>This action cannot be undone!!</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button color='error' type='submit' sx={{ borderRadius: 25 }} variant='contained' endIcon={<SendIcon />}>
          Confirm
        </Button>
      </DialogActions>
    </form>
  );
};
export default DeleteAccount;
