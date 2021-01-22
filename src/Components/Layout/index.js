import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Layout as AntLayout, Menu } from 'antd'
import ClientAuthContext from '../../Contexts/ClientContext'

const { Header, Content } = AntLayout

const menuMapping = {
  '/login': '3',
  '/': '1',
  '/cart': '2',
  '/add-order': '3',
}

const Layout = ({ children }) => {
  const { pathname } = useLocation()

  const { isAuth, setClient } = useContext(ClientAuthContext)

  const handleLogout = () => {
    localStorage.removeItem('clientToken')
    setClient(null)
  }

  return (
    <AntLayout style={{ height: '100%' }}>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[menuMapping[pathname]]}
        >
          <Menu.Item key="1">
            <Link to="/">Главная</Link>
          </Menu.Item>
          {isAuth && (
            <Menu.Item key="2">
              <Link to="/cart">Корзина</Link>
            </Menu.Item>
          )}
          {isAuth && (
            <Menu.Item key="4">
              <Link to="/add-order">Создать заявку</Link>
            </Menu.Item>
          )}
          <Menu.Item key="3">
            {isAuth ? (
              <span onClick={handleLogout}>Выйти</span>
            ) : (
              <Link to="/login">Войти</Link>
            )}
          </Menu.Item>
        </Menu>
      </Header>

      <Content>{children}</Content>
    </AntLayout>
  )
}

export default Layout
