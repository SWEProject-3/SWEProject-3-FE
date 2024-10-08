import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '@/pages/home';
import SplashRouter from './router/SplashRouter';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SplashRouter />}>
          <Route path='/' element={<Home />} />
        </Route>
        <Route path='/calendar' element={<Home />} />
        <Route path='/feed' element={<Home />} />
        <Route path='/search' element={<Home />} />
        <Route path='/my' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
