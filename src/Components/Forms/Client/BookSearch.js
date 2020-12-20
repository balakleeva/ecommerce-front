import React from 'react'
import { Form, Formik, Field } from 'formik'
import { StyledRow } from '../../StyledComponents'
import { Button, Card, Col, Input, Row } from 'antd'

const BookSearch = ({ handleSearch }) => {
  return (
    <Card style={{ marginBottom: '20px' }} title="Поиск книг">
      <Formik
        initialValues={{
          name: '',
          author: '',
          fromBuyPrice: null,
          toBuyPrice: null,
          fromRentPrice: null,
          toRentPrice: null,
        }}
        onSubmit={(values) => handleSearch(values)}
      >
        {() => (
          <Form>
            <StyledRow gutter={10}>
              <Col span={12}>
                <Row>Название книги: </Row>
                <StyledRow>
                  <Field name="name">
                    {({ field }) => (
                      <Input placeholder="Введите название книги" {...field} />
                    )}
                  </Field>
                </StyledRow>
              </Col>

              <Col span={12}>
                <Row>Автор: </Row>
                <StyledRow>
                  <Field name="author">
                    {({ field }) => (
                      <Input placeholder="Введите автора книги" {...field} />
                    )}
                  </Field>
                </StyledRow>
              </Col>

              <Col span={24}>Цена покупки:</Col>

              <Col span={12}>
                <Row>От: </Row>
                <Field name="fromBuyPrice">
                  {({ field }) => (
                    <Input placeholder="Введите цену покупки" {...field} />
                  )}
                </Field>
              </Col>
              <Col span={12}>
                <Row>До: </Row>
                <Field name="toBuyPrice">
                  {({ field }) => (
                    <Input placeholder="Введите цену покупки" {...field} />
                  )}
                </Field>
              </Col>

              <Col span={24} style={{ marginTop: '20px' }}>
                Цена аренды:
              </Col>

              <Col span={12}>
                <Row>
                  <Row>От: </Row>
                  <Field name="fromRentPrice">
                    {({ field }) => (
                      <Input placeholder="Введите цену аренды" {...field} />
                    )}
                  </Field>
                </Row>
              </Col>
              <Col span={12}>
                <Row>
                  <Row>До: </Row>
                  <Field name="toRentPrice">
                    {({ field }) => (
                      <Input placeholder="Введите цену аренды" {...field} />
                    )}
                  </Field>
                </Row>
              </Col>
            </StyledRow>
            <Button htmlType="submit">Поиск</Button>
          </Form>
        )}
      </Formik>
    </Card>
  )
}

export default BookSearch
