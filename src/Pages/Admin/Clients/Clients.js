import React, { useEffect, useContext } from 'react'
import Layout from '../../../Components/Admin/Layout'
import useRequest from '../../../Utils/useRequest'
import ClientService from '../../../Services/ClientService'
import { Button, Table } from 'antd'
import { Link } from 'react-router-dom'
import Loader from '../../../Components/Loader'
import { isLead } from '../../../Utils/roles'
import AdminAuthContext from '../../../Contexts/AdminContext'

const Clients = () => {
  const {
    fetch,
    state: { error, isLoading, payload },
  } = useRequest(ClientService.getAll)

  useEffect(() => {
    fetch()
  }, [])

  const handleDelete = (id) => {
    ClientService.remove(id).then(fetch)
  }

  const { adminInfo } = useContext(AdminAuthContext)

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
        <>
          {isLead(adminInfo.role) && (
            <Button onClick={() => handleDelete(record.id)}>Удалить</Button>
          )}
        </>
      ),
    },
  ]

  return (
    <Layout>
      <Button style={{ marginBottom: '10px' }}>
        <Link to="/admin/add-client">+ Добавить клиента</Link>
      </Button>
      {isLoading && <Loader />}
      {payload && <Table dataSource={payload} columns={columns} />}
    </Layout>
  )
}

export default Clients
