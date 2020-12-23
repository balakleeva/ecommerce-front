import React from 'react'
import { StyledRow, StyledSelect } from '../../../Components/StyledComponents'
import { Field, Form, Formik } from 'formik'
import { Button, Col, Input, Select } from 'antd'
import Layout from '../../../Components/Admin/Layout'
import { useHistory } from 'react-router-dom'
import AdminService from '../../../Services/AdminService'
import Row from 'antd/lib/row'
import * as Yup from 'yup'
import { stringValidator } from '../../../validators'

const { Option } = Select

const AddStaff = () => {
  const { push } = useHistory()

  return (
    <Layout>
      <Formik
        initialValues={{
          name: '',
          role: '',
          login: '',
          password: '',
        }}
        validationSchema={Yup.object().shape({
          name: stringValidator,
          role: stringValidator,
        })}
        onSubmit={(values) => {
          AdminService.create(values).then(() => push('/admin/staff'))
        }}
      >
        {({ setFieldValue, values }) => (
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
                <Row>Должность:</Row>
                <Row>
                  <Field name="role">
                    {() => (
                      <StyledSelect
                        onChange={(val) => setFieldValue('role', val)}
                      >
                        <Option value="мастер_чистоты">Мастер чистоты</Option>
                        <Option value="бухгалтер">Бухгалтер</Option>
                        <Option value="продавец">Продавец</Option>
                        <Option value="менеджер">Менеджер</Option>
                      </StyledSelect>
                    )}
                  </Field>
                </Row>
              </Col>
            </StyledRow>

            {(values.role === 'менеджер' || values.role === 'продавец') && (
              <>
                <StyledRow>
                  <Col span={24}>
                    <Row>Логин:</Row>
                    <Row>
                      <Field name="login">
                        {({ field }) => (
                          <Input placeholder="Введите логин" {...field} />
                        )}
                      </Field>
                    </Row>
                  </Col>
                </StyledRow>

                <StyledRow>
                  <Col span={24}>
                    <Row>Пароль:</Row>
                    <Row>
                      <Field name="password">
                        {({ field }) => (
                          <Input.Password
                            placeholder="Введите пароль"
                            {...field}
                          />
                        )}
                      </Field>
                    </Row>
                  </Col>
                </StyledRow>
              </>
            )}

            <Button htmlType="submit">Добавить</Button>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default AddStaff
