import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollRouteTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 60);
  }, [pathname]);

  return null;
};

export default ScrollRouteTop;
