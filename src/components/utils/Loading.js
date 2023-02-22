import { Box } from '@mui/system';
import scc1 from '../../static/imgs/scc-fb-grp.jpeg';
import { useValue } from '../context/ContextProvider';
import Loading3Balls from './Loading3Balls';

const PageLoading = () => {
  const { theme } = useValue();
  return (
    <>
      <Box sx={{ backgroundImage: `url(${scc1}) `, backgroundSize: 'cover', minHeight: 800 }}>
        <Box
          sx={{
            background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.5)',
            minHeight: 800,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Loading3Balls />
        </Box>
      </Box>
    </>
  );
};
export default PageLoading;
