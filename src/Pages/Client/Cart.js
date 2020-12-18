import React from 'react'
import Layout from '../../Components/Layout'
import {
  Content,
  StyledCard,
  StyledRow,
} from '../../Components/StyledComponents'
import { Button, Col, Row } from 'antd'

const Cart = () => {
  const books = [
    {
      id: 1,
      name: 'jjj',
      author: 'fff',
      genre: 'fff',
      publisher: 'fff',
      publishYear: '1111',
    },
    {
      id: 2,
      name: 'jjj',
      author: 'fff',
      genre: 'fff',
      publisher: 'fff',
      publishYear: '1111',
    },
  ]

  const handleRemoveFromCart = (bookId) => {
    let cart = []
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'))
    }

    cart = cart.filter((ids) => ids !== bookId)
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  return (
    <Layout>
      <Content>
        {books.map((book) => (
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

        <Row style={{ marginTop: '10px' }}>
          <Button type="primary" size="large" block>
            Оформить заказ
          </Button>
        </Row>
      </Content>
    </Layout>
  )
}

export default Cart
