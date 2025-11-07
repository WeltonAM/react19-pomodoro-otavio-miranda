import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router';
import Counter from '../pages/Counter';
import { AboutPomodoro } from '../components/shared/About';
import NotFound from '../pages/NotFound';
import { History } from '../pages/History';
import { Settings } from '../pages/Settings';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/counter" replace />} />
        <Route path='/counter' element={<Counter />} />
        <Route path='/history/' element={<History />} />
        <Route path='/settings/' element={<Settings />} />
        <Route path='/about-pomodoro/' element={<AboutPomodoro />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
  );
}
