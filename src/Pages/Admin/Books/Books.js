import React, { useContext, useEffect } from 'react'
import Layout from '../../../Components/Admin/Layout'
import useRequest from '../../../Utils/useRequest'
import BookService from '../../../Services/BookService'
import { Button, Row, Table } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import Loader from '../../../Components/Loader'
import styled from 'styled-components'
import { isLead } from '../../../Utils/roles'
import AdminAuthContext from '../../../Contexts/AdminContext'
import RentService from '../../../Services/RentService';

const StyledButton = styled(Button)`
  margin-right: 10px;
`

const Books = () => {
  const { adminInfo } = useContext(AdminAuthContext)
  const { push } = useHistory()
  const {
    fetch,
    state: { error, isLoading, payload },
  } = useRequest(BookService.getAll)

  useEffect(() => {
    fetch()
  }, [])

  const handleDelete = (id) => BookService.delete(id).then(() => fetch())

  const handleMostPopular = () => {
    BookService.mostPopular().then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "popular_purchase.pdf";
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();
      a.remove();
    })
  }

  const handleMostPopularRent = () => {
    RentService.mostPopular().then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "popular_rent.pdf";
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();
      a.remove();
    })
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
        <Row>
          <StyledButton>
            <Link to={`/admin/edit-book/${record.id}`}>Редактировать</Link>
          </StyledButton>
          <Button onClick={() => handleDelete(record.id)}>Удалить</Button>
        </Row>
      ),
    },
  ]

  return (
    <Layout>
      {isLead(adminInfo.role) && (
        <Button style={{ marginBottom: '10px' }}>
          <Link to="/admin/add-book">+ Добавить книгу</Link>
        </Button>
      )}
      <Button onClick={handleMostPopular}>Самая популярная книга для покупки</Button>
      <Button onClick={handleMostPopularRent}>Самая популярная книга для аренды</Button>
      {isLoading && <Loader />}
      {payload && <Table dataSource={payload} columns={columns} />}
    </Layout>
  )
}

export default Books
