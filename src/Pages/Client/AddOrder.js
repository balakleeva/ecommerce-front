import React from 'react'
import Layout from '../../Components/Layout'
import { Content, StyledRow } from '../../Components/StyledComponents'
import { Button, Card, Col, Input, notification, Row } from 'antd'
import { Formik, Form, Field } from 'formik'
import OrderService from '../../Services/OrderService'
import { useHistory } from 'react-router-dom'

const AddOrder = () => {
  const { push } = useHistory()
  return (
    <Layout>
      <Content>
        <Card>
          <Formik
            initialValues={{
              bookName: '',
            }}
            onSubmit={(values) =>
              OrderService.create(values).then((response) => {
                push('/')
                notification.success({
                  message: 'Заявка успешно отправлена',
                  placement: 'bottomRight',
                })
              })
            }
          >
            {() => (
              <Form>
                <StyledRow gutter={10} align="middle">
                  <Col span={12}>
                    <Row>Название книги: </Row>
                    <StyledRow>
                      <Field name="bookName">
                        {({ field }) => (
                          <Input
                            placeholder="Введите название книги"
                            {...field}
                          />
                        )}
                      </Field>
                    </StyledRow>
                  </Col>

                  <Button htmlType="submit">Отправить</Button>
                </StyledRow>
              </Form>
            )}
          </Formik>
        </Card>
      </Content>
    </Layout>
  )
}

export default AddOrder
