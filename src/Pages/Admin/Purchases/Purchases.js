import React, { useContext, useEffect } from 'react'
import { Button, Row, Table } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { StyledButton } from '../../../Components/StyledComponents'
import Loader from '../../../Components/Loader'
import Layout from '../../../Components/Admin/Layout'
import useRequest from '../../../Utils/useRequest'
import PurchaseService from '../../../Services/PurchaseService'
import moment from 'moment'
import AdminAuthContext from '../../../Contexts/AdminContext'
import { isDirector } from '../../../Utils/roles'

const Purchases = () => {
  const { adminInfo } = useContext(AdminAuthContext)

  const { push } = useHistory()
  const {
    fetch,
    state: { error, isLoading, payload },
  } = useRequest(PurchaseService.getAll)

  useEffect(() => {
    fetch()
  }, [])

  const handleMostExpensive = () => {
    PurchaseService.mostExpensive().then((response) => {
      push(`/admin/purchases/${response.id}`)
    })
  }

  const columns = [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: 'Количество книг',
      key: 'bookQuantity',
      render: (record) => <span>{record.Books.length}</span>,
    },
    {
      title: 'Клиент',
      key: 'clientName',
      render: (record) => (
        <span>{record.client ? record.client.name : record.guestName}</span>
      ),
    },
    {
      title: 'Сумма покупки',
      key: 'buySum',
      dataIndex: 'buySum',
    },
    {
      title: 'Дата',
      key: 'date',
      render: (record) => (
        <span>{moment(record.createdAt).format('DD-MM-YYYY')}</span>
      ),
    },
    {
      title: '',
      key: 'action',
      width: '100',
      render: (record) => (
        <Row>
          <StyledButton>
            <Link to={`/admin/purchases/${record.id}`}>Подробнее</Link>
          </StyledButton>
        </Row>
      ),
    },
  ]

  return (
    <Layout>
      <Button style={{ marginBottom: '10px' }}>
        <Link to="/admin/add-purchase">+ Добавить покупку</Link>
      </Button>
      {isDirector(adminInfo.role) && (
        <Button onClick={handleMostExpensive}>Самая дорогая покупка</Button>
      )}
      {isLoading && <Loader />}
      {payload && <Table dataSource={payload} columns={columns} />}
    </Layout>
  )
}

export default Purchases
