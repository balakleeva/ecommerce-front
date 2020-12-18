import React, { useEffect } from 'react'
import Layout from '../../../Components/Admin/Layout'
import useRequest from '../../../Utils/useRequest'
import BookService from '../../../Services/BookService'
import { Button, Row, Table } from 'antd'
import { Link } from 'react-router-dom'
import { Content } from '../../../Components/StyledComponents'
import Loader from '../../../Components/Loader'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  margin-right: 10px;
`

const Books = () => {
  const {
    fetch,
    state: { error, isLoading, payload },
  } = useRequest(BookService.getAll)

  useEffect(() => {
    fetch()
  }, [])

  const handleDelete = (id) => BookService.delete(id).then(() => fetch())

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
      <Button>
        <Link to="/admin/add-book">+ Добавить книгу</Link>
      </Button>
      <Content>
        {isLoading && <Loader />}
        {payload && <Table dataSource={payload} columns={columns} />}
      </Content>
    </Layout>
  )
}

export default Books