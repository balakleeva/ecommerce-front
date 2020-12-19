import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Col, Layout as AntLayout, Menu, Row } from 'antd'
import Text from 'antd/lib/typography/Text'
import AdminAuthContext from '../../../Contexts/AdminContext'
import { Content as ShopContent } from '../../StyledComponents'

const { Header, Content } = AntLayout

const Layout = ({ children }) => {
  const { push } = useHistory()
  const { adminInfo, isAuth, handleLogout } = useContext(AdminAuthContext)

  const onLogout = () => {
    handleLogout()
    push('/admin/login')
  }

  return (
    <AntLayout style={{ height: '100%' }}>
      <Header>
        <Row>
          <Col span={8}>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
              {isAuth && (
                <>
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
                  <Menu.Item key="7">
                    <Link to="/admin/purchases">Покупки</Link>
                  </Menu.Item>
                  <Menu.Item key="8">
                    <Link to="/admin/rents">Аренды</Link>
                  </Menu.Item>
                  {adminInfo.role === 'директор' && (
                    <Menu.Item key="6">
                      <Link to="/admin/staff">Сотрудники</Link>
                    </Menu.Item>
                  )}
                </>
              )}
              <Menu.Item key="5">
                {isAuth ? (
                  <span onClick={onLogout}>Выйти</span>
                ) : (
                  <Link to="/admin/login">Войти</Link>
                )}
              </Menu.Item>
            </Menu>
          </Col>
          <Col span={13} offset={3}>
            <Text style={{ color: 'white', fontSize: 24 }}>Admin</Text>
          </Col>
        </Row>
      </Header>

      <Content>
        <ShopContent>{children}</ShopContent>
      </Content>
    </AntLayout>
  )
}

export default Layout
