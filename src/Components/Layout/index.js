import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Layout as AntLayout, Menu } from 'antd'
import ClientAuthContext from '../../Contexts/ClientContext'

const { Header, Content, Footer } = AntLayout

const Layout = ({ children }) => {
  const { isAuth, setClient } = useContext(ClientAuthContext)

  const handleLogout = () => {
    localStorage.removeItem('clientToken')
    setClient(null)
  }

  return (
    <AntLayout style={{ height: '100%' }}>
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">
            <Link to="/">Главная</Link>
          </Menu.Item>
          {isAuth && (
            <Menu.Item key="2">
              <Link to="/cart">Корзина</Link>
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

      <Footer>footer</Footer>
    </AntLayout>
  )
}

export default Layout
