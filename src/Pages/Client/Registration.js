import React from 'react'
import Layout from '../../Components/Layout'
import { Button, Card, Col, Input, Row } from 'antd'

import { Formik, Form, Field } from 'formik'
import { StyledRow } from '../../Components/StyledComponents'
import ClientService from '../../Services/ClientService'
import { useHistory } from 'react-router-dom'

import * as Yup from 'yup'
import { stringValidator } from '../../validators'

const Registration = () => {
  const { push } = useHistory()
  return (
    <Layout>
      <Row justify="center" style={{ marginTop: '1rem' }}>
        <Col span={10}>
          <Card>
            <Formik
              initialValues={{
                name: '',
                phone: '',
                login: '',
                password: '',
              }}
              validationSchema={Yup.object().shape({
                name: stringValidator,
                phone: stringValidator,
                login: stringValidator,
                password: stringValidator,
              })}
              onSubmit={(values) => {
                ClientService.create(values).then(() => push('/login'))
              }}
            >
              {() => (
                <Form>
                  <StyledRow>
                    <Field name="name">
                      {({ field }) => (
                        <Input
                          type="text"
                          placeholder="Введите имя"
                          {...field}
                        />
                      )}
                    </Field>
                  </StyledRow>

                  <StyledRow>
                    <Field name="phone">
                      {({ field }) => (
                        <Input
                          type="text"
                          placeholder="Введите телефон"
                          {...field}
                        />
                      )}
                    </Field>
                  </StyledRow>

                  <StyledRow>
                    <Field name="login">
                      {({ field }) => (
                        <Input
                          type="text"
                          placeholder="Введите эмейл"
                          {...field}
                        />
                      )}
                    </Field>
                  </StyledRow>

                  <StyledRow>
                    <Field name="password">
                      {({ field }) => (
                        <Input.Password
                          placeholder="Введите пароль"
                          {...field}
                        />
                      )}
                    </Field>
                  </StyledRow>

                  <Button block htmlType="submit">
                    Зарегистрироваться
                  </Button>
                </Form>
              )}
            </Formik>
          </Card>
        </Col>
      </Row>
    </Layout>
  )
}

export default Registration
