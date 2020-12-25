import React, { useCallback, useContext, useEffect } from 'react';
import Layout from '../../../Components/Admin/Layout'
import useRequest from '../../../Utils/useRequest'
import { Button, Row, Table } from 'antd'
import { Link } from 'react-router-dom'
import { StyledButton } from '../../../Components/StyledComponents'
import Loader from '../../../Components/Loader'
import GenreService from '../../../Services/GenreService'
import AdminAuthContext from '../../../Contexts/AdminContext'
import { isLead } from '../../../Utils/roles'

const Genres = () => {
  const { adminInfo } = useContext(AdminAuthContext)

  const {
    fetch,
    state: { error, isLoading, payload },
  } = useRequest(GenreService.getAll)

  useEffect(() => {
    fetch()
  }, [])

  const remove = useCallback((id) => {
    GenreService.remove(id).then(fetch);
  }, [fetch]);

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
      title: 'Тип',
      key: 'genreType',
      dataIndex: 'genreType',
    },
    {
      title: '',
      key: 'action',
      width: '100',
      render: (record) => (
        <>
          {isLead(adminInfo.role) && <Row>
            <StyledButton>
              <Link to={`/admin/edit-genre/${record.id}`}>Редактировать</Link>
            </StyledButton>
            <Button onClick={() => remove(record.id)}>
              Удалить
          </Button>
          </Row>}
        </>
      ),
    },
  ]

  return (
    <Layout>
      {isLead(adminInfo.role) && (
        <Button style={{ marginBottom: '10px' }}>
          <Link to="/admin/add-genre">+ Добавить жанр</Link>
        </Button>
      )}
      {isLoading && <Loader />}
      {payload && <Table dataSource={payload} columns={columns} />}
    </Layout>
  )
}

export default Genres
