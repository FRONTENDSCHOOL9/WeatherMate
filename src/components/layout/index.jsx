import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import NavigationBarTop from '@components/layout/NavigationBarTop';
import NavigationBarBottom from '@components/layout/NavigationBarbottom';

const Layout = () => {
  return (
    <div>
      <NavigationBarTop />
      <Outlet />
      <Footer />
      <NavigationBarBottom />
    </div>
  );
};

export default Layout;
