import React, { useContext, useEffect } from 'react'
import Layout from '../../Components/Layout'
import useRequest from '../../Utils/useRequest'
import BookService from '../../Services/BookService'
import { useParams } from 'react-router-dom'
import Title from 'antd/lib/typography/Title'
import { Button, Card, Col, Descriptions, Image, Row } from 'antd'
import Loader from '../../Components/Loader'
import { Content, StyledRow } from '../../Components/StyledComponents'
import ClientAuthContext from '../../Contexts/ClientContext'
import { handleAddToCart } from '../../Utils/cart'
import { createGlobalStyle } from 'styled-components'

const Styled = createGlobalStyle`
  .ant-descriptions-view table {
    width: unset;
  }

  .ant-descriptions-view {
    display: flex;
    justify-content: center;
  }

  .ant-card-head-title {
    text-align: center;
    font-weight: bold;
  }
`

const Book = () => {
  const { bookId } = useParams()

  const {
    fetch,
    state: { error, isLoading, payload },
  } = useRequest(BookService.getOne)

  useEffect(() => {
    fetch(bookId)
  }, [])

  const { isAuth } = useContext(ClientAuthContext)

  console.log('payload', payload)

  return (
    <Layout>
      <Styled />
      <Content>
        {isLoading && <Loader />}
        {!isLoading && payload && (
          <StyledRow justify="center">
            <Col span={12}>
              <StyledRow justify="center">
                <Image style={{ objectFit: 'contain' }} src={payload.image} height={300} />
              </StyledRow>

              <StyledRow justify="center">
                <Title>{payload.name}</Title>
              </StyledRow>

              <Card title="Сведения о книге">
                <Descriptions column={1}>
                  <Descriptions.Item label="Автор">
                    {(payload.author && payload.author.name) || "Неизвестно"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Жанр">
                    {payload.genre.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Тип">
                    {payload.genre.genreType}
                  </Descriptions.Item>
                  <Descriptions.Item label="Издательство">
                    {payload.publisher}
                  </Descriptions.Item>
                  <Descriptions.Item label="Год выпуска">
                    {payload.publishYear}
                  </Descriptions.Item>
                  <Descriptions.Item label="Цена покупки">
                    {payload.buyPrice}
                  </Descriptions.Item>
                  <Descriptions.Item label="Цена аренды">
                    {payload.rentPrice}
                  </Descriptions.Item>
                </Descriptions>

                {isAuth && (
                  <Row justify="center">
                    <Button
                      type="primary"
                      onClick={() => handleAddToCart(payload.id)}
                      disabled={payload.quantity === 0}
                    >
                      Добавить в корзину
                    </Button>
                  </Row>
                )}
              </Card>
            </Col>
          </StyledRow>
        )}
      </Content>
    </Layout>
  )
}
export default Book
