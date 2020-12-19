import React, { useContext } from 'react'
import Layout from '../../Components/Layout'
import { Button, Card, Col, Input, notification, Row } from 'antd'

import { Formik, Form, Field } from 'formik'
import { Link, useHistory } from 'react-router-dom'
import { StyledRow } from '../../Components/StyledComponents'
import ClientService from '../../Services/ClientService'
import ClientAuthContext from '../../Contexts/ClientContext'

const Login = () => {
  const { push } = useHistory()
  const { setClient } = useContext(ClientAuthContext)

  return (
    <Layout>
      <Row justify="center" style={{ marginTop: '1rem' }}>
        <Col span={10}>
          <Card>
            <Formik
              initialValues={{
                login: '',
                password: '',
              }}
              onSubmit={(values) => {
                ClientService.login(values)
                  .then((response) => {
                    localStorage.setItem('clientToken', response)
                    setClient({
                      token: response,
                    })

                    push('/')
                  })
                  .catch((err) =>
                    notification.error({
                      message: err.message,
                      placement: 'bottomRight',
                    })
                  )
              }}
            >
              {() => (
                <Form>
                  <StyledRow>
                    <Field name="login">
                      {({ field }) => (
                        <Input
                          type="login"
                          placeholder="Введите эмейл"
                          {...field}
                        />
                      )}
                    </Field>
                  </StyledRow>

                  <StyledRow>
                    <Field name="password">
                      {({ field }) => (
                        <Input
                          type="password"
                          placeholder="Введите пароль"
                          {...field}
                        />
                      )}
                    </Field>
                  </StyledRow>

                  <Button block htmlType="submit">
                    Войти
                  </Button>
                </Form>
              )}
            </Formik>

            <Row justify="center" style={{ marginTop: '10px' }}>
              Нет аккаунта?{' '}
              <Link to="/registration" style={{ marginLeft: '5px' }}>
                Регистрация
              </Link>
            </Row>
          </Card>
        </Col>
      </Row>
    </Layout>
  )
}

export default Login
