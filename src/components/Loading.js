import { Backdrop, CircularProgress } from '@mui/material';
import { useValue } from './context/ContextProvider';

const Loading = () => {
  const {
    state: { loading },
  } = useValue();

  // open
  // dispatch({ type: 'START_LOADING' });
  // close
  // dispatch({ type: 'END_LOADING' });

  return (
    <>
      <Backdrop sx={{ zIndex: (theme) => theme.zIndex.modal + 10 }} open={loading}>
        <CircularProgress sx={{ color: '#f9de00' }} />
      </Backdrop>
    </>
  );
};

export default Loading;
