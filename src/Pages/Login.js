import React from 'react';
import Layout from '../Components/Layout';
import { Button, Card, Input, Row } from 'antd';

import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <Layout>
      <Row justify="center" style={{ marginTop: '1rem' }}>
        <Card>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={(values) => console.log('---', values)}
          >
            {() => (
              <Form>
                <Field name="email">
                  {() => (
                    <Input
                      type="email"
                      placeholder="Введите эмейл"
                      className="login-row"
                    />
                  )}
                </Field>

                <Field name="password">
                  {() => (
                    <Input
                      type="password"
                      placeholder="Введите пароль"
                      className="login-row"
                    />
                  )}
                </Field>

                <Button block type="submit">
                  Зарегистрироваться
                </Button>
              </Form>
            )}
          </Formik>

          <Row justify="center">
            Нет аккаунта? <Link to="/registration">Регистрация</Link>
          </Row>
        </Card>
      </Row>
    </Layout>
  );
};

export default Login;
