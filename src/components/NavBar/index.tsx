import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import styles from './NavBar.module.css';

const { Header } = Layout;

const NavBar: React.FC = () => {
  const location = useLocation();

  return (
    <Header className={styles.header}>
      <div className={styles.logo}>电影购票系统</div>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]}
      >
        <Menu.Item key="/" icon={<HomeOutlined />}>
          <Link to="/">首页</Link>
        </Menu.Item>
        <Menu.Item key="/user" icon={<UserOutlined />}>
          <Link to="/user">个人中心</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default NavBar; 