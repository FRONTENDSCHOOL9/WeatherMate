import { createBrowserRouter } from 'react-router-dom';

import Layout from '@components/layout';
import MainPage from '@pages/main/MainPage';
import MbtiTest from '@pages/Mbti/MbtiTest';
import ErrorPage from '@pages/ErrorPage';
import CommunityNew from '@pages/community/CommunityNew';
import CommunityDetail from './pages/community/CommunityDetail';
import Question from './pages/Mbti/Question';
import Result from './pages/Mbti/Result';
import SignUp from '@pages/user/SignUp';
import Login from '@pages/user/Login';
import UserPage from '@pages/user/UserPage';
import CommunityMain from './pages/community/CommunityMain';
import LocationDetailPage from './pages/location/LocationDetailPage';

import LocationMainPage from './pages/location/LocationMainPage';
import Setting from './pages/user/Setting';
import FoodMainPage from './pages/food/FoodMainPage';
import ReplyList from './pages/community/ReplyList';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'community',
        element: <CommunityMain />,
      },
      {
        path: 'community/new',
        element: <CommunityNew />,
      },
      {
        path: 'community/:_id',
        element: <CommunityDetail />,
        children: [
          {
            index: true,
            element: <ReplyList />
          }
        ]
      },
      {
        path: 'location',
        element: <LocationMainPage />,
      },
      {
        path: 'location/:id',
        element: <LocationDetailPage />,
      },

      {
        path: 'mbti',
        element: <MbtiTest />,
      },
      {
        path: 'mbti/question',
        element: <Question />,
      },
      {
        path: 'mbti/result',
        element: <Result />,
      },
      {
        path: 'user/mypage',
        element: <UserPage />,
      },
      {
        path: 'food',
        element: <FoodMainPage />,
      },
      {
        path: 'user/signup',
        element: <SignUp />,
      },
      {
        path: 'user/login',
        element: <Login />,
      },
      {
        path: 'user/setting',
        element: <Setting />,
      },
    ],
  },
]);

export default router;
