import React from "react";
import { Link } from "react-router-dom";
import { Icon, Menu, Layout } from "antd";
const { Sider } = Layout;

function Aside() {
  return (
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
    >
      <Menu className='aside-menu' theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Link to="/admin">
            <Icon type="home" />
            <span className="nav-text">Dashboard</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/admin/posts">
            <Icon type="form" />
            <span className="nav-text">Posts</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/admin/categories">
            <Icon type="container" />
            <span className="nav-text">Categories</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/admin/search">
            <Icon type="search" />
            <span className="nav-text">Find</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link to="/admin/images">
            <Icon type="picture" />
            <span className="nav-text">Images</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="6">
          <a href="/" target='_blank'>
            <Icon type="right-square" />
            <span className="nav-text">itHobbies</span>
          </a>
        </Menu.Item>
        <Menu.Item key="7">
          <a href="/logout">
            <Icon type="logout" />
            <span className="nav-text">Logout</span>
          </a>
        </Menu.Item>
      </Menu>
    </Sider>

  );
}

export default Aside;