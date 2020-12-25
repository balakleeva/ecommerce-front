import React, { useContext } from 'react'
import Layout from '../../../Components/Admin/Layout'
import { Button, Card, Col, Input, notification, Row } from 'antd'
import { Field, Form, Formik } from 'formik'
import { StyledRow } from '../../../Components/StyledComponents'
import AdminService from '../../../Services/AdminService'
import AdminAuthContext from '../../../Contexts/AdminContext'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import { stringValidator } from '../../../validators'
import { FieldError } from '../../../Components/Forms/Errors'

const Login = () => {
  const { push } = useHistory()
  const { handleLogin } = useContext(AdminAuthContext)

  return (
    <Layout>
      <Row justify="center">
        <Col span={10}>
          <Card>
            <Formik
              initialValues={{
                login: '',
                password: '',
              }}
              validationSchema={Yup.object().shape({
                login: stringValidator,
                password: stringValidator,
              })}
              onSubmit={(values) => {
                AdminService.auth(values)
                  .then((response) => {
                    handleLogin(response)
                    push('/admin/books')
                  })
                  .catch((err) =>
                    notification.error({
                      message: err.message,
                      placement: 'bottomRight',
                    })
                  )
              }}
            >
              {({ isValid }) => (
                <Form>
                  <StyledRow>
                    <Field name="login">
                      {({ field }) => (
                        <Col span={24}>
                          <Row>
                            Логин: <FieldError name="login" />
                          </Row>
                          <Row>
                            <Input
                              type="text"
                              placeholder="Введите логин"
                              {...field}
                            />
                          </Row>
                        </Col>
                      )}
                    </Field>
                  </StyledRow>

                  <StyledRow>
                    <Field name="password">
                      {({ field }) => (
                        <Col span={24}>
                          <Row>
                            Пароль:
                            <FieldError name="password" />
                          </Row>
                          <Row>
                            <Input.Password
                              placeholder="Введите пароль"
                              {...field}
                            />
                          </Row>
                        </Col>
                      )}
                    </Field>
                  </StyledRow>

                  <Button block htmlType="submit" disabled={!isValid}>
                    Войти
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

export default Login
