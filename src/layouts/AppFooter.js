import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      &copy; {new Date().getFullYear()} QUIZ APP | All Rights Reserved 
    </Footer>
  );
};

export default AppFooter;
