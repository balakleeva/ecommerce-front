import React, { useContext } from 'react'
import Layout from '../../../Components/Admin/Layout'
import { Button, Card, Input, Row } from 'antd'
import { Field, Form, Formik } from 'formik'
import { StyledRow } from '../../../Components/StyledComponents'
import AdminService from '../../../Services/AdminService'
import AdminAuthContext from '../../../Contexts/AdminContext'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const { push } = useHistory()
  const { handleLogin } = useContext(AdminAuthContext)

  return (
    <Layout>
      <Row justify="center">
        <Card>
          <Formik
            initialValues={{
              login: '',
              password: '',
            }}
            onSubmit={(values) => {
              AdminService.auth(values).then((response) => {
                handleLogin(response)
                push('/admin/books')
              })
            }}
          >
            {() => (
              <Form>
                <StyledRow>
                  <Field name="login">
                    {({ field }) => (
                      <Input
                        type="text"
                        placeholder="Введите логин"
                        {...field}
                      />
                    )}
                  </Field>
                </StyledRow>

                <StyledRow>
                  <Field name="password">
                    {({ field }) => (
                      <Input.Password placeholder="Введите пароль" {...field} />
                    )}
                  </Field>
                </StyledRow>

                <Button block htmlType="submit">
                  Войти
                </Button>
              </Form>
            )}
          </Formik>
        </Card>
      </Row>
    </Layout>
  )
}

export default Login
