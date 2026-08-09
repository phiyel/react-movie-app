import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

const Layout = ({ children }) => {
  const location = useLocation();
  const lastTrackedPathRef = useRef('');
  const showFooter = location.pathname !== '/login' && location.pathname !== '/signup';

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const routeKey = `${location.pathname}${location.search}`;
    if (lastTrackedPathRef.current === routeKey) return;
    lastTrackedPathRef.current = routeKey;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'pageview',
      raw_path: location.pathname,
      page_path: location.pathname,
      page_title: document.title,
      page_location: window.location.href,
      page_search: location.search || ''
    });
  }, [location.pathname, location.search]);

  return (
    <>
      <Header />
      {children}
      {showFooter && <Footer />}
    </>
  );
};

export default Layout;