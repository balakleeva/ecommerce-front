import React, { useEffect } from 'react'
import Layout from '../../../Components/Admin/Layout'
import { Content } from '../../../Components/StyledComponents'
import { Formik, Form, Field } from 'formik'
import { Button, Input } from 'antd'
import GenreSelector from '../../../Components/Selectors/GenreSelector'
import AuthorSelector from '../../../Components/Selectors/AuthorSelector'
import BookService from '../../../Services/BookService'
import { useHistory, useParams } from 'react-router-dom'
import useRequest from '../../../Utils/useRequest'

const AddBook = () => {
  const { push } = useHistory()
  const { bookId } = useParams()

  const {
    fetch,
    state: { error, isLoading, payload },
  } = useRequest(BookService.getOne)

  useEffect(() => {
    fetch(bookId)
  }, [])

  return (
    <Layout>
      <Content>
        {payload && (
          <Formik
            initialValues={{
              name: payload.name,
              genreId: payload.genreId,
              authorId: payload.authorId,
              publisher: payload.publisher,
              publishYear: payload.publishYear,
            }}
            onSubmit={(values) => {
              BookService.update(bookId, values).then(() =>
                push('/admin/books')
              )
            }}
          >
            {({ setFieldValue }) => (
              <Form>
                <Field name="name">
                  {({ field }) => (
                    <Input placeholder="Введите название" {...field} />
                  )}
                </Field>

                <Field name="genreId">
                  {() => (
                    <GenreSelector
                      onChange={(val) => {
                        setFieldValue('genreId', val)
                      }}
                    />
                  )}
                </Field>

                <Field name="authorId">
                  {() => (
                    <AuthorSelector
                      onChange={(val) => {
                        setFieldValue('authorId', val)
                      }}
                    />
                  )}
                </Field>

                <Field name="publisher">
                  {({ field }) => (
                    <Input placeholder="Введите издательство" {...field} />
                  )}
                </Field>

                <Field name="publishYear">
                  {({ field }) => (
                    <Input placeholder="Введите год издания" {...field} />
                  )}
                </Field>

                <Button htmlType="submit">Добавить</Button>
              </Form>
            )}
          </Formik>
        )}
      </Content>
    </Layout>
  )
}
export default AddBook
