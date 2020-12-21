import React, { useEffect } from 'react'
import Layout from '../../../Components/Admin/Layout'
import { StyledRow } from '../../../Components/StyledComponents'
import useRequest from '../../../Utils/useRequest'
import PurchaseService from '../../../Services/PurchaseService'
import { useParams } from 'react-router-dom'
import Loader from '../../../Components/Loader'
import { Card, Col, Row, Table } from 'antd'
import Text from 'antd/lib/typography/Text'

const Purchase = () => {
  const { purchaseId } = useParams()
  const {
    fetch,
    state: { error, isLoading, payload },
  } = useRequest(PurchaseService.getOne)

  useEffect(() => {
    fetch(purchaseId)
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
  ]

  return (
    <Layout>
      {isLoading && <Loader />}
      {payload && (
        <Row justify="center">
          <Col span={12}>
            <Row gutter={[10, 10]}>
              <Col span={12}>
                <Card title="Клиент">
                  <StyledRow>
                    <Text strong>Имя: </Text>
                    <Text>
                      {payload.client ? payload.client.name : payload.guestName}
                    </Text>
                  </StyledRow>
                </Card>
              </Col>

              <Col span={12}>
                <Card title="Сотрудник">
                  <StyledRow>
                    <Text strong>Имя: </Text>
                    <Text>
                      {payload.admin
                        ? payload.admin.name
                        : 'Через интернет-магазин'}
                    </Text>
                  </StyledRow>
                </Card>
              </Col>

              <Col span={24}>
                <Card title="Книги">
                  <Row>
                    <Text strong>Сумма покупки: </Text>
                    <Text>
                      {payload.Books.reduce((acc, el) => acc + el.buyPrice, 0)}
                    </Text>
                  </Row>
                  <Table dataSource={payload.Books} columns={columns} />
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </Layout>
  )
}

export default Purchase
