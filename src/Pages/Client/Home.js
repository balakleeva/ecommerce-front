import React, { useContext, useEffect, useState } from 'react'
import useRequest from '../../Utils/useRequest'
import BookService from '../../Services/BookService'
import Layout from '../../Components/Layout'
import { Button, Card, Col, Image, Row } from 'antd'
import Text from 'antd/lib/typography/Text'
import { Link } from 'react-router-dom'
import Loader from '../../Components/Loader'
import ClientAuthContext from '../../Contexts/ClientContext'
import { Content, StyledRow } from '../../Components/StyledComponents'
import Title from 'antd/lib/typography/Title'
import { handleAddToCart } from '../../Utils/cart'
import BookSearch from '../../Components/Forms/Client/BookSearch'

function Home() {
  const [books, setBooks] = useState(null)
  const {
    fetch,
    state: { error, isLoading, payload },
  } = useRequest(BookService.getAll)

  useEffect(() => {
    fetch()
  }, [])

  useEffect(() => {
    console.log('payload effect', payload)
    setBooks(payload)
  }, [payload])

  const handleSearch = (values) => {
    BookService.search(values).then((response) => {
      setBooks(response)
    })
  }

  const { isAuth } = useContext(ClientAuthContext)

  return (
    <Layout>
      <Content>
        <BookSearch handleSearch={handleSearch} />
        <Row gutter={10}>
          {isLoading && <Loader />}
          {books && books.length === 0 && <Title>Книг пока нет</Title>}
          {books &&
            books.length > 0 &&
            books.map((book) => (
              <Col span={6} key={book.id}>
                <Card title={book.name}>
                  <StyledRow justify="center">
                    <Image
                      src={book.image}
                      height={300}
                      style={{ objectFit: 'contain' }}
                    />
                  </StyledRow>
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
