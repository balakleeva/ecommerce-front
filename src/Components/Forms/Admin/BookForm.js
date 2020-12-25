import React from 'react'
import { Field, Form, Formik } from 'formik'
import { StyledRow } from '../../StyledComponents'
import { Button, Col, Input, Row } from 'antd'
import GenreSelector from '../../Selectors/GenreSelector'
import AuthorSelector from '../../Selectors/AuthorSelector'
import { FieldError } from '../Errors'

const BookForm = ({ initValues, onSubmit, validationSchema }) => {
  return (
    <Formik
      initialValues={initValues}
      validationSchema={validationSchema}
      onSubmit={(values) => onSubmit(values)}
    >
      {({ setFieldValue, values, isSubmitting, isValid }) => (
        <Form>
          <StyledRow>
            <Field name="name">
              {({ field }) => (
                <Col span={24}>
                  <Row>
                    Название:
                    <FieldError name="name" />
                  </Row>
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
                  <Row>
                    Жанр и тип: <FieldError name="genreId" />
                  </Row>
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
                  <Row>
                    Автор: <FieldError name="authorId" />
                  </Row>
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
                  <Row>
                    Издательство: <FieldError name="publisher" />
                  </Row>
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
                  <Row>
                    Год издания: <FieldError name="publishYear" />
                  </Row>
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
                  <Row>
                    Цена покупки: <FieldError name="buyPrice" />
                  </Row>
                  <Row>
                    <Input
                      type="number"
                      placeholder="Введите цену продажи"
                      {...field}
                    />
                  </Row>
                </Col>
              )}
            </Field>
          </StyledRow>

          <StyledRow>
            <Field name="rentPrice">
              {({ field }) => (
                <Col span={24}>
                  <Row>
                    Цена аренды: <FieldError name="rentPrice" />
                  </Row>
                  <Row>
                    <Input
                      type="number"
                      placeholder="Введите цену аренды"
                      {...field}
                    />
                  </Row>
                </Col>
              )}
            </Field>
          </StyledRow>

          <StyledRow>
            <Field name="quantity">
              {({ field }) => (
                <Col span={24}>
                  <Row>
                    Количество: <FieldError name="quantity" />
                  </Row>
                  <Row>
                    <Input
                      placeholder="Введите количество"
                      type="number"
                      {...field}
                    />
                  </Row>
                </Col>
              )}
            </Field>
          </StyledRow>

          <StyledRow>
            <Field name="image">
              {({ field }) => (
                <Col span={24}>
                  <Row>
                    Картинка: <FieldError name="image" />
                  </Row>
                  <Row>
                    <Input placeholder="Введите url картинки" {...field} />
                  </Row>
                </Col>
              )}
            </Field>
          </StyledRow>

          <Button htmlType="submit" disabled={isSubmitting || !isValid}>
            Отправить
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default BookForm
