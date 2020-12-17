import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Layout as AntLayout, Menu, Row } from 'antd'
import Text from 'antd/lib/typography/Text'

const { Header, Content, Footer } = AntLayout

const Layout = ({ children }) => {
  return (
    <AntLayout style={{ height: '100%' }}>
      <Header>
        <Row>
          <Col span={8}>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Link to="/admin/clients">Клиенты</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/admin/books">Книги</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/admin/genres">Жанры</Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/admin/authors">Авторы</Link>
              </Menu.Item>
              <Menu.Item key="5">
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
  )
}

export default Layout
