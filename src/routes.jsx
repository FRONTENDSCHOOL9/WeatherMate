import { createBrowserRouter } from 'react-router-dom';

import Layout from '@components/layout';
import MainPage from '@pages/main/MainPage';
import Community from '@pages/community/Community';
import Location from '@pages/location/Location';
import MbtiTest from '@pages/Mbti/MbtiTest';
import Login from '@pages/user/Login';
import ErrorPage from '@pages/ErrorPage';
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
        path: 'allcities',
        element: <AllCitiesWeather />,
      },
      {
        path: 'community',
        element: <Community />,
      },
      {
        path: 'loaction/:_id',
        element: <Location />,
      },
      {
        path: 'mbti',
        element: <MbtiTest />,
      },
      {
        path: 'user',
        element: <Login />,
      },
    ],
  },
]);

export default router;
