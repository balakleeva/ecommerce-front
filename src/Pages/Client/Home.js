import React, { useContext, useEffect } from 'react'
import useRequest from '../../Utils/useRequest'
import BookService from '../../Services/BookService'
import Layout from '../../Components/Layout'
import { Button, Card, Col, Row } from 'antd'
import Text from 'antd/lib/typography/Text'
import { Link } from 'react-router-dom'
import Loader from '../../Components/Loader'
import ClientAuthContext from '../../Contexts/ClientContext'
import { Content, StyledRow } from '../../Components/StyledComponents'

function Home() {
  const {
    fetch,
    state: { error, isLoading, payload },
  } = useRequest(BookService.getAll)

  useEffect(() => {
    fetch()
  }, [])

  const { isAuth } = useContext(ClientAuthContext)

  const handleAddToCart = (bookId) => {
    let cart = []
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'))
    }

    cart.push(bookId)

    localStorage.setItem('cart', JSON.stringify(cart))
  }

  return (
    <Layout>
      <Content>
        <Row gutter={10}>
          {isLoading && <Loader />}
          {payload &&
            payload.length > 0 &&
            payload.map((book) => (
              <Col span={6} key={book.id}>
                <Card title={book.name}>
                  <StyledRow>
                    <Text strong>Издательство: </Text> {book.publisher}
                  </StyledRow>

                  <StyledRow>
                    <Button block>
                      <Link to={`/books/${book.id}`}>Открыть</Link>
                    </Button>
                  </StyledRow>

                  {isAuth && (
                    <Row>
                      <Button block onClick={() => handleAddToCart(book.id)}>
                        Добавить в корзину
                      </Button>
                    </Row>
                  )}
                </Card>
              </Col>
            ))}
        </Row>
      </Content>
    </Layout>
  )
}

export default Home
