import React from 'react'
import { Field, Form, Formik } from 'formik'
import { StyledRow } from '../../StyledComponents'
import { Button, Col, Input, Row } from 'antd'
import GenreSelector from '../../Selectors/GenreSelector'
import AuthorSelector from '../../Selectors/AuthorSelector'

const BookForm = ({ initValues, onSubmit }) => {
  return (
    <Formik initialValues={initValues} onSubmit={(values) => onSubmit(values)}>
      {({ setFieldValue, values }) => (
        <Form>
          <StyledRow>
            <Field name="name">
              {({ field }) => (
                <Col span={24}>
                  <Row>Название:</Row>
                  <Row>
                    <Input placeholder="Введите название" {...field} />
                  </Row>
                </Col>
              )}
            </Field>
          </StyledRow>

          <StyledRow>
            <Field name="genreId">
              {() => (
                <Col span={24}>
                  <Row>Жанр и тип:</Row>
                  <Row>
                    <GenreSelector
                      value={values.genreId}
                      onChange={(val) => {
                        setFieldValue('genreId', val)
                      }}
                    />
                  </Row>
                </Col>
              )}
            </Field>
          </StyledRow>
          <StyledRow>
            <Field name="authorId">
              {() => (
                <Col span={24}>
                  <Row>Автор:</Row>
                  <Row>
                    <AuthorSelector
                      value={values.authorId}
                      onChange={(val) => {
                        setFieldValue('authorId', val)
                      }}
                    />
                  </Row>
                </Col>
              )}
            </Field>
          </StyledRow>

          <StyledRow>
            <Field name="publisher">
              {({ field }) => (
                <Col span={24}>
                  <Row>Издательство:</Row>
                  <Row>
                    <Input placeholder="Введите издательство" {...field} />
                  </Row>
                </Col>
              )}
            </Field>
          </StyledRow>

          <StyledRow>
            <Field name="publishYear">
              {({ field }) => (
                <Col span={24}>
                  <Row>Год издания:</Row>
                  <Row>
                    <Input placeholder="Введите год издания" {...field} />
                  </Row>
                </Col>
              )}
            </Field>
          </StyledRow>

          <StyledRow>
            <Field name="buyPrice">
              {({ field }) => (
                <Col span={24}>
                  <Row>Цена покупки:</Row>
                  <Row>
                    <Input type="number" placeholder="Введите цену продажи" {...field} />
                  </Row>
                </Col>
              )}
            </Field>
          </StyledRow>

          <StyledRow>
            <Field name="rentPrice">
              {({ field }) => (
                <Col span={24}>
                  <Row>Цена аренды:</Row>
                  <Row>
                    <Input type="number" placeholder="Введите цену аренды" {...field} />
                  </Row>
                </Col>
              )}
            </Field>
          </StyledRow>

          <StyledRow>
            <Field name="image">
              {({ field }) => (
                <Col span={24}>
                  <Row>Картинка:</Row>
                  <Row>
                    <Input placeholder="Введите url картинки" {...field} />
                  </Row>
                </Col>
              )}
            </Field>
          </StyledRow>

          <Button htmlType="submit">Отправить</Button>
        </Form>
      )}
    </Formik>
  )
}

export default BookForm
