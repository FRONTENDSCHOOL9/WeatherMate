import { createBrowserRouter } from 'react-router-dom';

import Layout from '@components/layout';
import MainPage from '@pages/main/MainPage';
import Location from '@pages/location/Location';
import MbtiTest from '@pages/Mbti/MbtiTest';
import ErrorPage from '@pages/ErrorPage';
import CommunityNew from '@pages/community/CommunityNew';
import CommunityDetail from './pages/community/CommunityDetail';
import AllCitiesWeather from '@pages/main/AllCitiesWeather';
import Question from './pages/Mbti/Question';
import Result from './pages/Mbti/Result';
import SignUp from '@pages/user/SignUp';
import Login from '@pages/user/Login';
import UserPage from '@pages/user/UserPage';
import CommunityMain from './pages/community/CommunityMain';
import LocationDetailPage from './pages/location/LocationDetailPage';


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
        path: 'allcities',
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
        path: 'community/detail',
        element: <CommunityDetail />,
      },
      {
        path: 'location',
        element: <Location />,
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
        path: 'user',
        element: <UserPage />,
      },
      {
        path: 'user/signup',
        element: <SignUp />,
      },
      {
        path: 'user/login',
        element: <Login />
      },
    ],
  },
]);

export default router;
