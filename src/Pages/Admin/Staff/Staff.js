import React, { useEffect } from 'react'
import Layout from '../../../Components/Admin/Layout'
import useRequest from '../../../Utils/useRequest'
import { Button, Row, Table } from 'antd'
import { Link } from 'react-router-dom'
import { Content } from '../../../Components/StyledComponents'
import Loader from '../../../Components/Loader'
import styled from 'styled-components'
import AdminService from '../../../Services/AdminService'

const StyledButton = styled(Button)`
  margin-right: 10px;
`

const Authors = () => {
  const {
    fetch,
    state: { error, isLoading, payload },
  } = useRequest(AdminService.getAll)

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
      title: 'Должность',
      key: 'role',
      dataIndex: 'role',
    },
    {
      title: '',
      key: 'action',
      width: '100',
      render: (record) => (
        <Row>
          <StyledButton>
            <Link to={`/admin/edit-staff/${record.id}`}>Редактировать</Link>
          </StyledButton>
        </Row>
      ),
    },
  ]

  return (
    <Layout>
      <Button>
        <Link to="/admin/add-staff">+ Добавить сотрудника</Link>
      </Button>
      <Content>
        {isLoading && <Loader />}
        {payload && <Table dataSource={payload} columns={columns} />}
      </Content>
    </Layout>
  )
}

export default Authors
