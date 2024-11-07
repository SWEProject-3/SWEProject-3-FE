import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '@/pages/home';
import SplashRouter from './router/SplashRouter';
import CalendarPage from '@/pages/calendar';
import MyPage from '@/pages/mypage';
import EditProfilePage from '@/pages/editprofile';
import SearchPage from '@/pages/search';
import SchedulePage from '@/pages/schedule';
import FeedDetailPage from '@/pages/feeddetail';
import Signin from '@/pages/auth/signin';
import Signup from '@/pages/auth/signup';
import FeedPage from '@/pages/feed';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SplashRouter />}>
          <Route path='/' element={<Signin />} />
        </Route>
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/calendar' element={<CalendarPage />} />
        <Route path='/feed' element={<FeedPage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/my' element={<MyPage />} />
        <Route path='/alarm' element={<Home />} />
        <Route path='/schedule' element={<SchedulePage />} />
        <Route path='/feeddetail/:id' element={<FeedDetailPage />} />
        <Route path='/edit-profile' element={<EditProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}
