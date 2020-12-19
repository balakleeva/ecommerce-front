import React from 'react'
import { StyledRow, StyledSelect } from '../../../Components/StyledComponents'
import { Field, Form, Formik } from 'formik'
import { Button, Input, Select } from 'antd'
import Layout from '../../../Components/Admin/Layout'
import { useHistory } from 'react-router-dom'
import AdminService from '../../../Services/AdminService'

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
        onSubmit={(values) => {
          AdminService.create(values).then(() => push('/admin/staff'))
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <StyledRow>
              <Field name="name">
                {({ field }) => <Input placeholder="Введите имя" {...field} />}
              </Field>
            </StyledRow>

            <StyledRow>
              <Field name="role">
                {() => (
                  <StyledSelect onChange={(val) => setFieldValue('role', val)}>
                    <Option value="мастер_чистоты">Мастер чистоты</Option>
                    <Option value="бухгалтер">Бухгалтер</Option>
                    <Option value="продавец">Продавец</Option>
                    <Option value="менеджер">Менеджер</Option>
                    <Option value="директор">Директор</Option>
                  </StyledSelect>
                )}
              </Field>
            </StyledRow>

            {values.role === 'менеджер' && (
              <>
                <StyledRow>
                  <Field name="login">
                    {({ field }) => (
                      <Input placeholder="Введите логин" {...field} />
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
