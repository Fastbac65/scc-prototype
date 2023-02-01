import ContentCardTraining from './content/ContentCardTraining';
import Content2CardsHist from './content/Content2CardsHist';
import { Box } from '@mui/material';
import { useValue } from './context/ContextProvider';

const Patrol = () => {
  const { theme } = useValue();
  return (
    <Box sx={{ background: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)' }}>
      {/* <Zoom in={1}> */}
      <ContentCardTraining />
      {/* </Zoom> */}
      <Content2CardsHist />
    </Box>
  );
};

export default Patrol;
