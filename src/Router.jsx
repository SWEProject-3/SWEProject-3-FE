import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '@/pages/home';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
