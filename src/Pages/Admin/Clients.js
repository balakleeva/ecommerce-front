import React, { useEffect } from 'react'
import Layout from '../../Components/Admin/Layout'
import useRequest from '../../Utils/useRequest'
import ClientService from '../../Services/ClientService'
import { Button, Table, Col } from 'antd'
import Title from 'antd/lib/typography/Title'
import { Link } from 'react-router-dom'
import { Content, StyledRow } from '../../Components/StyledComponents'

const Clients = () => {
  const {
    fetch,
    state: { error, isLoading, payload },
  } = useRequest(ClientService.getAll)

  useEffect(() => {
    fetch()
  }, [])

  console.log('pya', payload)

  const handleDelete = (id) => {
    console.log('id: ', id)
  }

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
      title: 'Телефон',
      key: 'phone',
      dataIndex: 'phone',
    },
    {
      title: '',
      key: 'action',
      width: '100',
      render: (record) => (
        <Button onClick={() => handleDelete(record.id)}>Удалить</Button>
      ),
    },
  ]

  return (
    <Layout>
      <StyledRow justify="center">
        <Col span={2} offset={10}>
          <Title level={3}>Клиенты</Title>
        </Col>
        <Col span={2} offset={9}>
          <Button>
            <Link to="/admin/add-client">+ Добавить клиента</Link>
          </Button>
        </Col>
      </StyledRow>
      <Content>
        <Table dataSource={payload} columns={columns} />
      </Content>
    </Layout>
  )
}

export default Clients
