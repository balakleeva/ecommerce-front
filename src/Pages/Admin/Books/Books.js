import React, { useContext, useEffect } from 'react'
import Layout from '../../../Components/Admin/Layout'
import useRequest from '../../../Utils/useRequest'
import BookService from '../../../Services/BookService'
import { Button, Row, Table } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import Loader from '../../../Components/Loader'
import styled from 'styled-components'
import { isDirector, isLead } from '../../../Utils/roles'
import AdminAuthContext from '../../../Contexts/AdminContext'
import RentService from '../../../Services/RentService'

const StyledButton = styled(Button)`
  margin-right: 10px;
`

const Books = () => {
  const { push } = useHistory()
  const { adminInfo } = useContext(AdminAuthContext)
  const {
    fetch,
    state: { error, isLoading, payload },
  } = useRequest(BookService.getAll)

  useEffect(() => {
    fetch()
  }, [])

  const handleDelete = (id) => BookService.delete(id).then(() => fetch())

  const handleMostPopular = () => {
    push('/admin/most-popular-book')
  }

  const handleMostPopularRent = () => {
    push('/admin/most-popular-book-rent')
  }

  const columns = [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: 'Название',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Издательство',
      key: 'publisher',
      dataIndex: 'publisher',
    },
    {
      title: 'Год публикации',
      key: 'publishYear',
      dataIndex: 'publishYear',
    },
    {
      title: 'Цена продажи',
      key: 'buyPrice',
      dataIndex: 'buyPrice',
    },
    {
      title: 'Цена аренды',
      key: 'rentPrice',
      dataIndex: 'rentPrice',
    },
    {
      title: 'Количество',
      key: 'quantity',
      dataIndex: 'quantity',
    },
    {
      title: '',
      key: 'action',
      width: '100',
      render: (record) => (
        <>
          {isLead(adminInfo.role) && <Row>
            <StyledButton>
              <Link to={`/admin/edit-book/${record.id}`}>Редактировать</Link>
            </StyledButton>
            <Button onClick={() => handleDelete(record.id)}>Удалить</Button>
          </Row>}
        </>
      ),
    },
  ]

  return (
    <Layout>
      <Row gutter={10}>
        {isLead(adminInfo.role) && (
          <Button style={{ marginBottom: '10px' }}>
            <Link to="/admin/add-book">+ Добавить книгу</Link>
          </Button>
        )}
        {isDirector(adminInfo.role) && (
          <Button onClick={handleMostPopular}>
            Самая популярная книга для покупки
          </Button>
        )}
        {isDirector(adminInfo.role) && (
          <Button onClick={handleMostPopularRent}>
            Самая популярная книга для аренды
          </Button>
        )}
      </Row>
      {isLoading && <Loader />}
      {payload && <Table dataSource={payload} columns={columns} />}
    </Layout>
  )
}

export default Books
