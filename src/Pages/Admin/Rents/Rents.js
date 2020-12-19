import React, { useEffect } from 'react'
import { Button, notification, Row, Table } from 'antd'
import { Link } from 'react-router-dom'
import { StyledButton } from '../../../Components/StyledComponents'
import Loader from '../../../Components/Loader'
import Layout from '../../../Components/Admin/Layout'
import useRequest from '../../../Utils/useRequest'
import moment from 'moment'
import RentService from '../../../Services/RentService'

const Rents = () => {
  const {
    fetch,
    state: { error, isLoading, payload },
  } = useRequest(RentService.getAll)

  useEffect(() => {
    fetch()
  }, [])

  console.log('pay', payload)

  const handleReturn = (rentId) => {
    RentService.updateReturn(rentId).then(() => {
      notification.success({
        message: 'Аренда завершена',
        placement: 'bottomRight',
      })

      fetch()
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
      dataIndex: ['client', 'name'],
    },
    {
      title: 'Сумма аренды',
      key: 'rentSum',
      dataIndex: 'rentSum',
    },
    {
      title: 'Дата взятия',
      key: 'date',
      render: (record) => (
        <span>{moment(record.createdAt).format('DD-MM-YYYY')}</span>
      ),
    },
    {
      title: 'Дата возврата',
      key: 'date',
      render: (record) => (
        <span>{moment(record.returnDate).format('DD-MM-YYYY')}</span>
      ),
    },
    {
      title: 'Возращено',
      key: 'isRetured',
      render: (record) => <span>{record.isReturned ? 'Да' : 'Нет'}</span>,
    },
    {
      title: '',
      key: 'action',
      width: '100',
      render: (record) => (
        <Row>
          <StyledButton>
            <Link to={`/admin/rents/${record.id}`}>Подробнее</Link>
          </StyledButton>
          <StyledButton onClick={() => handleReturn(record.id)}>
            Отметить возврат
          </StyledButton>
        </Row>
      ),
    },
  ]

  return (
    <Layout>
      <Button style={{ marginBottom: '10px' }}>
        <Link to="/admin/add-rent">+ Добавить аренду</Link>
      </Button>
      {isLoading && <Loader />}
      {payload && <Table dataSource={payload} columns={columns} />}
    </Layout>
  )
}

export default Rents
