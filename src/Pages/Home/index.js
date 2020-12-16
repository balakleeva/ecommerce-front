import React, { useEffect } from 'react';
import GenreSelector from '../../Components/Selectors/GenreSelector';
import useRequest from '../../Utils/useRequest';
import BookService from '../../Services/BookService';
import { Button, Card, Col, Row } from 'antd';
import Layout from '../../Components/Layout';
import Text from 'antd/lib/typography/Text';
import { Link } from 'react-router-dom';

function Home() {
  const {
    fetch,
    state: { error, isLoading, payload },
  } = useRequest(BookService.getAll);

  useEffect(() => {
    fetch();
  }, []);

  console.log('payload', payload);

  return (
    <Layout>
      <h1>Home</h1>
      <GenreSelector />

      <Row>
        {payload &&
          payload.length > 0 &&
          payload.map((book) => (
            <Col span={6} key={book.id}>
              <Card title={book.name}>
                <Row>
                  <Text strong>Издательство:</Text> {book.publisher}
                </Row>

                <Row>
                  <Button block>
                    <Link to={`/books/${book.id}`}>Открыть</Link>
                  </Button>
                </Row>
              </Card>
            </Col>
          ))}
      </Row>
    </Layout>
  );
}

export default Home;
