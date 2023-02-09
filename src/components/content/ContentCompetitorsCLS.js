import Content2CardsBoaties from './Content2CardsBoaties';
import Content2CardsChamps from './Content2CardsChamps';
import Content2CardsSwimmers from './Content2CardsSwimmers';
import scc1 from '../../static/imgs/header3.jpeg';
import scc2 from '../../static/imgs/header4.jpeg';
import scc3 from '../../static/imgs/header7.jpeg';
import { Box } from '@mui/material';
import { useValue } from '../context/ContextProvider';

const ContentCompetitorsCLS = () => {
  const { theme } = useValue();
  return (
    <div>
      <Box sx={{ backgroundImage: `url(${scc2}) `, backgroundSize: 'cover' }}>
        <Box sx={{ background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)' }}>
          <Content2CardsChamps />
        </Box>
      </Box>
      <Box sx={{ backgroundImage: `url(${scc1}) `, backgroundSize: 'cover' }}>
        <Box sx={{ background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)' }}>
          <Content2CardsSwimmers />
        </Box>
      </Box>
      <Box sx={{ backgroundImage: `url(${scc3}) `, backgroundSize: 'cover' }}>
        <Box sx={{ background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)' }}>
          <Content2CardsBoaties />
        </Box>
      </Box>
    </div>
  );
};
export default ContentCompetitorsCLS;
