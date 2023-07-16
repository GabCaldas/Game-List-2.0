'use client'
import GameList from '@/pages/GameList';
import LogIn from '@/pages/LogIn';
import SignUp from '@/pages/SignUp';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/gamelist" element={<GameList />} />
      </Routes>
    </BrowserRouter>
  );
}
