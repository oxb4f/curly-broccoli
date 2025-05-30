import { useEffect } from 'react';
import { useLocation } from 'react-router';

const ScrollToTopRoute = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children;
};

export default ScrollToTopRoute;
