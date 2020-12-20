import React, { useEffect, useState } from 'react'
import { Button, notification, Row, Table } from 'antd'
import { Link } from 'react-router-dom'
import { StyledButton } from '../../../Components/StyledComponents'
import Loader from '../../../Components/Loader'
import Layout from '../../../Components/Admin/Layout'
import useRequest from '../../../Utils/useRequest'
import moment from 'moment'
import RentService from '../../../Services/RentService'
import RentSearch from '../../../Components/Forms/Admin/RentSearch'

const Rents = () => {
  const [rents, setRents] = useState(null)

  const {
    fetch,
    state: { error, isLoading, payload },
  } = useRequest(RentService.getAll)

  useEffect(() => {
    fetch()
  }, [])

  const handleReturn = (rentId) => {
    RentService.updateReturn(rentId).then(() => {
      notification.success({
        message: 'Аренда завершена',
        placement: 'bottomRight',
      })

      fetch()
    })
  }

  useEffect(() => {
    setRents(payload)
  }, [payload])

  const handleSearch = (values) => {
    RentService.search(values).then((response) => setRents(response))
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
      key: 'isReturned',
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
          <StyledButton
            onClick={() => handleReturn(record.id)}
            disabled={record.isReturned}
          >
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
      <RentSearch handleSearch={handleSearch} />
      {isLoading && <Loader />}
      {rents && <Table dataSource={rents} columns={columns} />}
    </Layout>
  )
}

export default Rents
