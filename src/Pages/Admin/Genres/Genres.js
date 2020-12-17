import React, { useEffect } from 'react'
import Layout from '../../../Components/Admin/Layout'
import useRequest from '../../../Utils/useRequest'
import { Button, Row, Table } from 'antd'
import { Link } from 'react-router-dom'
import { Content } from '../../../Components/StyledComponents'
import Loader from '../../../Components/Loader'
import styled from 'styled-components'
import GenreService from '../../../Services/GenreService'

const StyledButton = styled(Button)`
  margin-right: 10px;
`

const Genres = () => {
  const {
    fetch,
    state: { error, isLoading, payload },
  } = useRequest(GenreService.getAll)

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
      <Button>
        <Link to="/admin/add-genre">+ Добавить жанр</Link>
      </Button>
      <Content>
        {isLoading && <Loader />}
        {payload && <Table dataSource={payload} columns={columns} />}
      </Content>
    </Layout>
  )
}

export default Genres
