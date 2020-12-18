import React, { useContext, useEffect } from 'react'
import Layout from '../../Components/Layout'
import useRequest from '../../Utils/useRequest'
import BookService from '../../Services/BookService'
import { useParams } from 'react-router-dom'
import Title from 'antd/lib/typography/Title'
import { Button, Col, Image, Row } from 'antd'
import Text from 'antd/lib/typography/Text'
import Loader from '../../Components/Loader'
import { Content, StyledRow } from '../../Components/StyledComponents'
import ClientAuthContext from '../../Contexts/ClientContext'
import { handleAddToCart } from '../../Utils/cart'

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

  return (
    <Layout>
      <Content>
        {isLoading && <Loader />}
        {!isLoading && payload && (
          <StyledRow justify="center">
            <Col span={12}>
              <StyledRow justify="center">
                <Image style={{ objectFit: 'contain' }} src={payload.image} />
              </StyledRow>

              <StyledRow justify="center">
                <Title>{payload.name}</Title>
              </StyledRow>

              <StyledRow justify="center">
                <Text strong>Жанр: </Text> {payload.genre.name}
              </StyledRow>

              <StyledRow justify="center">
                <Text strong>Тип: </Text> {payload.genre.genreType}
              </StyledRow>

              <StyledRow justify="center">
                <Text strong>Издательство: </Text> {payload.publisher}
              </StyledRow>

              <StyledRow justify="center">
                <Text strong>Год выпуска: </Text> {payload.publishYear}
              </StyledRow>

              {isAuth && (
                <Row>
                  <Button block onClick={() => handleAddToCart(payload.id)}>
                    Добавить в корзину
                  </Button>
                </Row>
              )}
            </Col>
          </StyledRow>
        )}
      </Content>
    </Layout>
  )
}
export default Book
