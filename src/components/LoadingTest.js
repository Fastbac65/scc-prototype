import { Backdrop, Button, CircularProgress } from '@mui/material';
import { useValue } from './context/ContextProvider';

const LoadingTest = () => {
  const {
    state: { loading },
    dispatch,
  } = useValue();

  const handleClick = () => {
    dispatch({ type: 'START_LOADING', loading: true });
  };
  const handleClose = () => {
    dispatch({ type: 'END_LOADING', loading: false });
  };

  return (
    <>
      <Button onClick={handleClick}>show</Button>
      <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} onClick={handleClose}>
        <CircularProgress sx={{ color: '#f9de00' }} />
      </Backdrop>
    </>
  );
};

export default LoadingTest;
