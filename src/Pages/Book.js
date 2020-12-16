import React, { useEffect } from 'react';
import Layout from '../Components/Layout';
import useRequest from '../Utils/useRequest';
import BookService from '../Services/BookService';
import { useParams } from 'react-router-dom';
import Title from 'antd/lib/typography/Title';
import { Col, Row } from 'antd';
import Text from 'antd/lib/typography/Text';

const Book = () => {
  const { bookId } = useParams();

  const {
    fetch,
    state: { error, isLoading, payload },
  } = useRequest(BookService.getOne);

  useEffect(() => {
    fetch(bookId);
  }, []);

  return (
    <Layout>
      {isLoading && <div>loading...</div>}
      {!isLoading && payload && (
        <Row justify="center">
          <Col span={12}>
            <Row justify="center">
              <Title>{payload.name}</Title>
            </Row>

            <Row justify="center">
              <Text strong>Жанр: </Text> {payload.genre.name}
            </Row>

            <Row justify="center">
              <Text strong>Тип: </Text> {payload.genre.genreType}
            </Row>

            <Row justify="center">
              <Text strong>Издательство: </Text> {payload.publisher}
            </Row>

            <Row justify="center">
              <Text strong>Год выпуска: </Text> {payload.publishYear}
            </Row>
          </Col>
        </Row>
      )}
    </Layout>
  );
};

export default Book;
