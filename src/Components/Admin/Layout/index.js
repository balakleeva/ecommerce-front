import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Col, Layout as AntLayout, Menu, Row } from 'antd'
import Text from 'antd/lib/typography/Text'
import AdminAuthContext from '../../../Contexts/AdminContext'
import { Content as ShopContent } from '../../StyledComponents'
import { isDirector, isLead } from '../../../Utils/roles'

const { Header, Content } = AntLayout

const Layout = ({ children }) => {
  const { pathname } = useLocation()
  const { push } = useHistory()
  const { adminInfo, isAuth, handleLogout } = useContext(AdminAuthContext)

  const [selectedKey, setSelectedLey] = useState('1')

  const onLogout = () => {
    handleLogout()
    push('/admin/login')
  }

  useEffect(() => {
    if (pathname.includes('client')) {
      setSelectedLey('1')
    } else if (pathname.includes('book')) {
      setSelectedLey('2')
    } else if (pathname.includes('genre')) {
      setSelectedLey('3')
    } else if (pathname.includes('author')) {
      setSelectedLey('4')
    } else if (pathname.includes('purchase')) {
      setSelectedLey('7')
    } else if (pathname.includes('rent')) {
      setSelectedLey('8')
    } else if (pathname.includes('order')) {
      setSelectedLey('10')
    } else if (pathname.includes('staff')) {
      setSelectedLey('6')
    } else if (pathname.includes('login')) {
      setSelectedLey('5')
    }
  }, [pathname])

  console.log('sseeee', selectedKey)

  return (
    <AntLayout style={{ height: '100%' }}>
      <Header>
        <Row>
          <Col span={8}>
            <Menu theme="dark" mode="horizontal" selectedKeys={[selectedKey]}>
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
                  {isLead(adminInfo.role) && (
                    <Menu.Item key="10">
                      <Link to="/admin/orders">Заявки</Link>
                    </Menu.Item>
                  )}
                  {isDirector(adminInfo.role) && (
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
