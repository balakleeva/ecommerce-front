import React, { useEffect } from 'react'
import Layout from '../../../Components/Admin/Layout'
import useRequest from '../../../Utils/useRequest'
import { Button, Row, Table } from 'antd'
import { Link } from 'react-router-dom'
import Loader from '../../../Components/Loader'
import styled from 'styled-components'
import AuthorService from '../../../Services/AuthorService'

const StyledButton = styled(Button)`
  margin-right: 10px;
`

const Authors = () => {
  const {
    fetch,
    state: { error, isLoading, payload },
  } = useRequest(AuthorService.getAll)

  useEffect(() => {
    fetch()
  }, [])

  const columns = [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: 'Имя',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Бигорафия',
      key: 'bio',
      dataIndex: 'bio',
    },
    {
      title: '',
      key: 'action',
      width: '100',
      render: (record) => (
        <Row>
          <StyledButton>
            <Link to={`/admin/edit-genre/${record.id}`}>Редактировать</Link>
          </StyledButton>
        </Row>
      ),
    },
  ]

  return (
    <Layout>
      <Button style={{ marginBottom: '10px' }}>
        <Link to="/admin/add-author">+ Добавить автора</Link>
      </Button>
      {isLoading && <Loader />}
      {payload && <Table dataSource={payload} columns={columns} />}
    </Layout>
  )
}

export default Authors
