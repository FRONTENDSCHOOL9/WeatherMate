import { createBrowserRouter } from 'react-router-dom';

import Layout from '@components/layout';
import MainPage from '@pages/main/MainPage';
import MbtiTest from '@pages/Mbti/MbtiTest';
import ErrorPage from '@pages/ErrorPage';
import CommunityNew from '@pages/community/CommunityNew';
import CommunityDetail from './pages/community/CommunityDetail';
import MbtiQuestion from './pages/Mbti/MbtiQuestion';
import MbtiResult from './pages/Mbti/MbtiResult';
import SignUp from '@pages/user/SignUp';
import Login from '@pages/user/Login';
import UserPage from '@pages/user/UserPage';
import CommunityMain from './pages/community/CommunityMain';
import LocationDetailPage from './pages/location/LocationDetailPage';

import LocationMainPage from './pages/location/LocationMainPage';
import Setting from './pages/user/Setting';
import FoodMainPage from './pages/food/FoodMainPage';
import ReplyList from './pages/community/ReplyList';
import MainLogin from '@pages/user/MainLogin';
import UserEdit from '@pages/user/UserEdit';
import Edit from '@pages/user/Edit';
import AllCitiesWeather from '@pages/main/AllCitiesWeather';

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
        path: '/allcity',
        element: <AllCitiesWeather />,
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
            element: <ReplyList />,
          },
        ],
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
        element: <MbtiQuestion />,
      },
      {
        path: 'mbti/result/',
        element: <MbtiResult />,
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
      {
        path: 'user/edit',
        element: <UserEdit />,
      },
      {
        path: 'edit',
        element: <Edit />,
      },
    ],
  },
  {
    path: 'main/login',
    element: <MainLogin />,
  },
]);

export default router;
// 이게 수정
