import React, { useEffect } from 'react'
import Layout from '../../Components/Layout'
import {
  Content,
  StyledCard,
  StyledRow,
} from '../../Components/StyledComponents'
import { Button, Col, Row } from 'antd'
import Title from 'antd/lib/typography/Title'
import useRequest from '../../Utils/useRequest'
import BookService from '../../Services/BookService'
import { handleRemoveFromCart } from '../../Utils/cart'
import Loader from '../../Components/Loader'

const Cart = () => {
  const {
    fetch,
    state: { error, isLoading, payload },
  } = useRequest(BookService.getByIds)

  useEffect(() => {
    const ids = JSON.parse(localStorage.cart)
    console.log('aassaa', ids)
    fetch({ ids })
  }, [])

  return (
    <Layout>
      <Content>
        {isLoading && <Loader />}
        {payload && payload.length === 0 && <Title>Ваша корзина пуста</Title>}
        {payload && payload.length > 0 && (
          <>
            {payload.map((book) => (
              <StyledRow key={book.id}>
                <StyledCard title={book.name}>
                  <Row>
                    <Col span={6}>Автор: {book.author}</Col>
                    <Col span={6}>Издательство: {book.publisher}</Col>
                    <Col span={6}>
                      <Button onClick={() => handleRemoveFromCart(book.id)}>
                        Удалить из корзины
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6}>Жанр: {book.genre}</Col>
                    <Col span={6}>Год издания: {book.publishYear}</Col>
                  </Row>
                </StyledCard>
              </StyledRow>
            ))}
            <StyledRow style={{ marginTop: '10px' }}>
              <Button type="primary" size="large" block>
                Купить книги
              </Button>
            </StyledRow>

            <StyledRow style={{ marginTop: '10px' }}>
              <Button type="primary" size="large" block>
                Взять книги в аренду
              </Button>
            </StyledRow>
          </>
        )}
      </Content>
    </Layout>
  )
}

export default Cart
