import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Drawer } from 'antd';
import { AuthContext } from '../context/AuthContext';
import {
  UserOutlined,
  SettingOutlined,
  FileOutlined,
  MenuOutlined,
} from '@ant-design/icons';

import AppFooter from './AppFooter';
import "./Layout.css";

const { Header, Content } = Layout;

const AuthenticatedLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);
  const {currentUser} = useContext(AuthContext);

  const toggleDrawer = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuItemClick = () => {
    setCollapsed(true); // Close the drawer when a menu item is clicked
  };

  return (
    <Layout>
      <Drawer
        open={!collapsed}
        onClose={toggleDrawer}
        placement="left"
        width={200}
        bodyStyle={{ padding: 0 }}
        headerStyle={{ display: 'none' }}
      >
        <Link to="/" className="logo" style={{ display: "flex", justifyContent: "start", alignItems: "center", height: "44px" }}>CS 1500</Link>
        <Menu defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="2" icon={<UserOutlined />} onClick={handleMenuItemClick}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<SettingOutlined />} onClick={handleMenuItemClick}>
            <Link to="/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<SettingOutlined />} onClick={handleMenuItemClick}>
            <Link to="/courses">Courses</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<SettingOutlined />} onClick={handleMenuItemClick}>
            <Link to="/gradebook">Grade Book</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<FileOutlined />} onClick={handleMenuItemClick}>
            <Link to="/logout">Logout</Link>
          </Menu.Item>
        </Menu>
        <div
          onClick={toggleDrawer}
          style={{
            position: 'absolute',
            top: 0,
            right: 16,
            fontSize: '30px',
            cursor: 'pointer',
          }}
        >
          &times;
        </div>
      </Drawer>
      <Layout>
        <Header
          style={{
            background: '#fff',
            boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px',
          }}
        >
          <Link to="/" className="logo">QUIZ MASTER</Link>
          <div>
            <span style={{ marginRight: '16px' }}>Welcome, {currentUser?.first_name?.toUpperCase()}</span>  
            <MenuOutlined
              onClick={toggleDrawer}
              style={{ fontSize: '20px', cursor: 'pointer' }}
            />
          </div>
        </Header>
        <Content style={{ margin: '8px', minHeight: "90vh" }}>
          <div className="main">
            {children}
          </div>
        </Content>
        <AppFooter />
      </Layout>
    </Layout>
  );
};

export default AuthenticatedLayout;
