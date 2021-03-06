import React, { useCallback, useContext, useEffect } from 'react';
import Layout from '../../../Components/Admin/Layout'
import useRequest from '../../../Utils/useRequest'
import { Button, Row, Table } from 'antd'
import { Link } from 'react-router-dom'
import Loader from '../../../Components/Loader'
import styled from 'styled-components'
import AuthorService from '../../../Services/AuthorService'
import AdminAuthContext from '../../../Contexts/AdminContext'
import { isLead } from '../../../Utils/roles'

const StyledButton = styled(Button)`
  margin-right: 10px;
`

const Authors = () => {
  const { adminInfo } = useContext(AdminAuthContext)

  const {
    fetch,
    state: { error, isLoading, payload },
  } = useRequest(AuthorService.getAll);

  const remove = useCallback((id) => {
    AuthorService.remove(id).then(fetch);
  }, [fetch]);

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
        <>
          {isLead(adminInfo.role) && <Row>
            <StyledButton style={{ marginRight: 10 }}>
              <Link to={`/admin/edit-author/${record.id}`}>Редактировать</Link>
            </StyledButton>
            <StyledButton onClick={() => remove(record.id)}>Удалить</StyledButton>
          </Row>}
        </>
      ),
    },
  ]

  return (
    <Layout>
      {isLead(adminInfo.role) && (
        <Button style={{ marginBottom: '10px' }}>
          <Link to="/admin/add-author">+ Добавить автора</Link>
        </Button>
      )}
      {isLoading && <Loader />}
      {payload && <Table dataSource={payload} columns={columns} />}
    </Layout>
  )
}

export default Authors
