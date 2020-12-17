import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Layout as AntLayout, Menu, Row } from 'antd';
import Text from 'antd/lib/typography/Text';

const { Header, Content, Footer } = AntLayout;

const Layout = ({ children }) => {
  return (
    <AntLayout style={{ height: '100%' }}>
      <Header>
        <Row>
          <Col span={8}>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
              <Menu.Item key="1">
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/genre">Genre</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/author">Author</Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/login">Войти</Link>
              </Menu.Item>
            </Menu>
          </Col>
          <Col span={13} offset={3}>
            <Text style={{ color: 'white', fontSize: 24 }}>Admin</Text>
          </Col>
        </Row>
      </Header>

      <Content>{children}</Content>

      <Footer>footer</Footer>
    </AntLayout>
  );
};

export default Layout;
