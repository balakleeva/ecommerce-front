import React from 'react'
import Layout from '../../../Components/Admin/Layout'
import { Content, StyledRow } from '../../../Components/StyledComponents'
import { Formik, Form, Field } from 'formik'
import { Button, Input } from 'antd'
import GenreSelector from '../../../Components/Selectors/GenreSelector'
import AuthorSelector from '../../../Components/Selectors/AuthorSelector'
import BookService from '../../../Services/BookService'
import { useHistory } from 'react-router-dom'

const AddBook = () => {
  const { push } = useHistory()

  return (
    <Layout>
      <Content>
        <Formik
          initialValues={{
            name: '',
            genreId: '',
            authorId: '',
            publisher: '',
            publishYear: '',
          }}
          onSubmit={(values) => {
            BookService.create(values).then((response) => push('/admin/books'))
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              <StyledRow>
                <Field name="name">
                  {({ field }) => (
                    <Input placeholder="Введите название" {...field} />
                  )}
                </Field>
              </StyledRow>

              <StyledRow>
                <Field name="genreId">
                  {() => (
                    <GenreSelector
                      onChange={(val) => {
                        setFieldValue('genreId', val)
                      }}
                    />
                  )}
                </Field>
              </StyledRow>
              <StyledRow>
                <Field name="authorId">
                  {() => (
                    <AuthorSelector
                      onChange={(val) => {
                        setFieldValue('authorId', val)
                      }}
                    />
                  )}
                </Field>
              </StyledRow>

              <StyledRow>
                <Field name="publisher">
                  {({ field }) => (
                    <Input placeholder="Введите издательство" {...field} />
                  )}
                </Field>
              </StyledRow>

              <StyledRow>
                <Field name="publishYear">
                  {({ field }) => (
                    <Input placeholder="Введите год издания" {...field} />
                  )}
                </Field>
              </StyledRow>

              <Button htmlType="submit">Добавить</Button>
            </Form>
          )}
        </Formik>
      </Content>
    </Layout>
  )
}
export default AddBook
