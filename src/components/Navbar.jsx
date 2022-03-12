import React from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import {
  UserOutlined,
  MoneyCollectFilled,
  BulbOutlined,
  FundOutlined,
  MenuOutlined
} from '@ant-design/icons';

export default function Navbar() {
  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/"> Crypto News </Link>
        </Typography.Title>
        <Button className="menu-control-container">Hi</Button>
      </div>
    </div>
  );
}
