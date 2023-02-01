import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link as RouterLink, matchPath, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';

function useRouteMatch(patterns) {
  const { pathname } = useLocation();
  const defPath = { path: '/', url: '/' };

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }
  return defPath;
}

function HeaderTabs() {
  // You need to provide the routes in descendant order.
  // This means that if you have nested routes like:
  // users, users/new, users/edit.
  // Then the order should be ['users/add', 'users/edit', 'users'].
  const routeMatch = useRouteMatch(['/history', '/patrol', '/blog', '/']);
  const currentTab = routeMatch.path;

  return (
    <Box mb={2}>
      <Tabs value={currentTab}>
        <Tab label='Home' value='/' to='/' component={RouterLink} />
        <Tab label='Blogs' value='/blog' to='/blog' component={RouterLink} />
        <Tab label='Training' value='/patrol' to='/patrol' component={RouterLink} />
        <Tab label='History' value='/history' to='/history' component={RouterLink} />
      </Tabs>
    </Box>
  );
}

export default HeaderTabs;
