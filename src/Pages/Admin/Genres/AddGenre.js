import React from 'react'
import Layout from '../../../Components/Admin/Layout'
import {
  StyledRow,
  StyledSelect,
} from '../../../Components/StyledComponents'
import { Formik, Form, Field } from 'formik'
import { Button, Input, Select } from 'antd'
import { useHistory } from 'react-router-dom'
import GenreService from '../../../Services/GenreService'

const { Option } = Select

const AddGenre = () => {
  const { push } = useHistory()

  return (
    <Layout>
      <Formik
        initialValues={{
          name: '',
          genreType: '',
        }}
        onSubmit={(values) => {
          GenreService.create(values).then(() => push('/admin/genres'))
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
              <Field name="genreType">
                {() => (
                  <StyledSelect
                    onChange={(val) => setFieldValue('genreType', val)}
                  >
                    <Option value="книга">Книга</Option>
                    <Option value="журнал">Журнал</Option>
                  </StyledSelect>
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
