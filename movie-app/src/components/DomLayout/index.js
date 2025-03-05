import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

const Layout = ({ children }) => {
  const location = useLocation();
  const showFooter = location.pathname !== '/login' && location.pathname !== '/signup';

  return (
    <>
      <Header />
      {children}
      {showFooter && <Footer />}
    </>
  );
};

export default Layout;