import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLogin from '@pages/user/MainLogin';

export default function RandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    token && navigate('/home');
  }, []);

  return (
    <>
      <MainLogin />
    </>
  );
}
