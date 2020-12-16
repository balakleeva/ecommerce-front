import React from 'react';
import Layout from '../Components/Layout';
import { Button, Card, Input, Row } from 'antd';

import { Formik, Form, Field } from 'formik';

const Registration = () => {
  return (
    <Layout>
      <Row justify="center" style={{ marginTop: '1rem' }}>
        <Card>
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
            }}
            onSubmit={(values) => console.log('---', values)}
          >
            {() => (
              <Form>
                <Field name="name">
                  {() => (
                    <Input
                      type="text"
                      placeholder="Введите имя"
                      className="login-row"
                    />
                  )}
                </Field>

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
                  Войти
                </Button>
              </Form>
            )}
          </Formik>
        </Card>
      </Row>
    </Layout>
  );
};

export default Registration;
