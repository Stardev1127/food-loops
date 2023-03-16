import React from 'react';
import { useSelector } from 'react-redux';
import LoginPage from './login';
import { selectAuth } from '../selectors';
import DashboardPage from './home';

const StartPage = () => {
  const auth = useSelector(selectAuth);
  return auth ? <DashboardPage /> : <LoginPage />;
};

export default StartPage;
