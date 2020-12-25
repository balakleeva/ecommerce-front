import React from 'react'
import { useHistory } from 'react-router-dom'
import Layout from '../../../Components/Admin/Layout'
import { Field, Form, Formik } from 'formik'
import { StyledRow } from '../../../Components/StyledComponents'
import { Button, Col, Input } from 'antd'
import Row from 'antd/lib/row'
import ClientService from '../../../Services/ClientService'

const AddClient = () => {
  const { push } = useHistory()

  return (
    <Layout>
      <Formik
        initialValues={{
          name: '',
          phoneNumber: '',
        }}
        onSubmit={(values) => {
          console.log('vaaa', values)
          ClientService.createAdmin(values).then(() => push('/admin/clients'))
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <StyledRow>
              <Col span={24}>
                <Row>Имя:</Row>
                <Row>
                  <Field name="name">
                    {({ field }) => (
                      <Input placeholder="Введите имя" {...field} />
                    )}
                  </Field>
                </Row>
              </Col>
            </StyledRow>

            <StyledRow>
              <Col span={24}>
                <Row>Номер телефона:</Row>
                <Row>
                  <Field name="phoneNumber">
                    {({ field }) => (
                      <Input placeholder="Введите номер телефона" {...field} />
                    )}
                  </Field>
                </Row>
              </Col>
            </StyledRow>

            <Button htmlType="submit" disabled={isSubmitting}>
              Добавить
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default AddClient
