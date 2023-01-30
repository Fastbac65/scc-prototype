import { Button, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import PasswordField from './PasswordField';
import SendIcon from '@mui/icons-material/Send';

const ReAuth = ({ passwordRef }) => {
  return (
    <div>
      <DialogContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
        <DialogContentText>Current password:</DialogContentText>
        <PasswordField size='small' inputRef={passwordRef} />
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button type='submit' sx={{ borderRadius: 25 }} variant='contained' endIcon={<SendIcon />}>
          Submit
        </Button>
      </DialogActions>
    </div>
  );
};
export default ReAuth;
