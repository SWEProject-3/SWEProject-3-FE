import { useEffect, useState } from 'react';

import Splash from '@/components/splash';

import { Outlet } from 'react-router-dom';

const SplashRouter = () => {
  const isRedirectUser = sessionStorage.getItem('isRedirectUser');
  const [isSplash, setIsSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplash(false);
      sessionStorage.setItem('isRedirectUser', true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  if (isSplash && !isRedirectUser) {
    return <Splash />;
  } else {
    return <Outlet />;
  }
};

export default SplashRouter;
