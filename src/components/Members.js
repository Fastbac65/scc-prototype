import ContentMembers from './content/ContentMembers';
import RecentPosts from './RecentPosts';
import scc2 from '../static/imgs/Tabourie-Day-2-003-Tabourie-1024x491.jpeg';
import { Box } from '@mui/material';
import { useValue } from './context/ContextProvider';

export default function Members() {
  const { theme } = useValue();
  return (
    <>
      <Box sx={{ backgroundImage: `url(${scc2}) `, backgroundSize: 'cover' }}>
        <Box sx={{ background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)' }}>
          <ContentMembers />
        </Box>
      </Box>
      {/* <Box sx={{ backgroundImage: `url(${scc2}) `, backgroundSize: 'cover' }}>
        <Box sx={{ background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)' }}>
          <RecentPosts />
        </Box>
      </Box> */}
    </>
  );
}
