import React, { useContext, useEffect, useState } from 'react'
import { Button, Row, Table } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import Loader from '../../../Components/Loader'
import Layout from '../../../Components/Admin/Layout'
import AdminAuthContext from '../../../Contexts/AdminContext'
import useRequest from '../../../Utils/useRequest'
import { StyledButton } from '../../../Components/StyledComponents'
import OrderService from '../../../Services/OrderService'
import OrderSearch from '../../../Components/Forms/Admin/OrderSearch'

const Orders = () => {
  const [orders, setOrders] = useState(null)

  const { adminInfo } = useContext(AdminAuthContext)

  const { push } = useHistory()
  const {
    fetch,
    state: { error, isLoading, payload },
  } = useRequest(OrderService.getAll)

  useEffect(() => {
    fetch()
  }, [])

  useEffect(() => {
    setOrders(payload)
  }, [payload])

  const columns = [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: 'Название книги',
      key: 'bookName',
      dataIndex: 'bookName',
    },
    {
      title: 'Клиент',
      key: 'clientName',
      dataIndex: ['client', 'name'],
      render: (record) => <span>{record ? record : '-'}</span>,
    },
    {
      title: 'Выполнена?',
      key: 'isDone',
      render: (record) => {
        return <span>{record.isDone ? 'Да' : 'Нет'}</span>
      },
    },
    {
      title: '',
      key: 'action',
      width: '100',
      render: (record) => (
        <Row>
          <StyledButton disabled={record.isDone}>
            <Link to={`/admin/make-order/${record.id}`}>Выполнить</Link>
          </StyledButton>
        </Row>
      ),
    },
  ]

  const handleSearch = (values) => {
    OrderService.search(values).then((response) => {
      setOrders(response)
    })
  }

  return (
    <Layout>
      <OrderSearch handleSearch={handleSearch} />
      {/*{isDirector(adminInfo.role) && (*/}
      {/*	<Button onClick={handleMostExpensive}>Самая дорогая покупка</Button>*/}
      {/*)}*/}
      {isLoading && <Loader />}
      {!isLoading && orders && <Table dataSource={orders} columns={columns} />}
    </Layout>
  )
}

export default Orders
