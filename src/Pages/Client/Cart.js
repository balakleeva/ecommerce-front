import React, { useEffect } from 'react'
import Layout from '../../Components/Layout'
import {
  Content,
  StyledCard,
  StyledRow,
} from '../../Components/StyledComponents'
import { Button, Col, notification, Row } from 'antd'
import Title from 'antd/lib/typography/Title'
import useRequest from '../../Utils/useRequest'
import BookService from '../../Services/BookService'
import { handleRemoveFromCart } from '../../Utils/cart'
import Loader from '../../Components/Loader'
import PurchaseService from '../../Services/PurchaseService'
import { useHistory } from 'react-router-dom'
import RentService from '../../Services/RentService'

const Cart = () => {
  const { push } = useHistory()
  const {
    fetch,
    state: { error, isLoading, payload },
  } = useRequest(BookService.getByIds)

  const ids = localStorage.cart && JSON.parse(localStorage.cart)

  useEffect(() => {
    console.log('---dsadas', ids)
    if (ids && ids.length > 0) {
      fetch({ ids })
    }
  }, [])

  const handlePurchase = () => {
    PurchaseService.create({
      bookIds: payload.map((book) => book.id),
    })
      .then(() => {
        localStorage.removeItem('cart')
        push('/')

        notification.success({
          message: 'Покупка успешно совершена',
          placement: 'bottomRight',
        })
      })
      .catch((err) =>
        notification.error({
          message: err.message,
          placement: 'bottomRight',
        })
      )
  }

  const handleRent = () => {
    RentService.create({
      bookIds: payload.map((book) => book.id),
    })
      .then(() => {
        localStorage.removeItem('cart')
        push('/')

        notification.success({
          message: 'Аренда успешно оформлена',
          placement: 'bottomRight',
        })
      })
      .catch((err) =>
        notification.error({
          message: err.message,
          placement: 'bottomRight',
        })
      )
  }

  return (
    <Layout>
      <Content>
        {isLoading && <Loader />}
        {(!ids || ids.length === 0 || (payload && payload.length === 0)) && (
          <Title>Ваша корзина пуста</Title>
        )}
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
              <Button
                type="primary"
                size="large"
                block
                onClick={handlePurchase}
              >
                Купить книги
              </Button>
            </StyledRow>

            <StyledRow>
              <Button type="primary" size="large" block onClick={handleRent}>
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
