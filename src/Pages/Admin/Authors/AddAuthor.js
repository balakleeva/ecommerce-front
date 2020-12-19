import React from 'react'
import Layout from '../../../Components/Admin/Layout'
import { StyledRow } from '../../../Components/StyledComponents'
import { Formik, Form, Field } from 'formik'
import { Button, Input } from 'antd'
import { useHistory } from 'react-router-dom'
import TextArea from 'antd/lib/input/TextArea'
import AuthorService from '../../../Services/AuthorService'

const AddGenre = () => {
  const { push } = useHistory()

  return (
    <Layout>
      <Formik
        initialValues={{
          name: '',
          bio: '',
        }}
        onSubmit={(values) => {
          AuthorService.create(values).then(() => push('/admin/authors'))
        }}
      >
        {() => (
          <Form>
            <StyledRow>
              <Field name="name">
                {({ field }) => <Input placeholder="Введите имя" {...field} />}
              </Field>
            </StyledRow>

            <StyledRow>
              <Field name="bio">
                {({ field }) => (
                  <TextArea placeholder="Введите биографию" {...field} />
                )}
              </Field>
            </StyledRow>

            <Button htmlType="submit">Добавить</Button>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}
export default AddGenre
