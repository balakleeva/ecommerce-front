import React from 'react'
import Layout from '../../../Components/Admin/Layout'
import { Formik, Form, Field } from 'formik'
import { Button, Col, Row } from 'antd'
import { StyledRow } from '../../../Components/StyledComponents'
import ClientSelector from '../../../Components/Selectors/ClientSelector'
import MultipleBookSelector from '../../../Components/Selectors/MultipleBookSelector'
import { useHistory } from 'react-router-dom'
import RentService from '../../../Services/RentService'

const AddRent = () => {
  const { push } = useHistory()

  return (
    <Layout>
      <Formik
        initialValues={{
          bookIds: [],
          clientId: '',
        }}
        onSubmit={(values) => {
          RentService.createAdmin(values).then(() => push('/admin/rents'))
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <StyledRow>
              <Field name="clientId">
                {() => (
                  <Col span={24}>
                    <Row>Клиент:</Row>
                    <Row>
                      <ClientSelector
                        value={values.genreId}
                        onChange={(val) => {
                          setFieldValue('clientId', val)
                        }}
                      />
                    </Row>
                  </Col>
                )}
              </Field>
            </StyledRow>

            <StyledRow>
              <Field name="bookIds">
                {() => (
                  <Col span={24}>
                    <Row>Книги:</Row>
                    <Row>
                      <MultipleBookSelector
                        value={values.genreId}
                        onChange={(val) => {
                          setFieldValue('bookIds', val)
                        }}
                      />
                    </Row>
                  </Col>
                )}
              </Field>
            </StyledRow>

            <Button htmlType="submit">Отправить</Button>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default AddRent
