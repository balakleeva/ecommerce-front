import React from 'react'
import { Form, Formik, Field } from 'formik'
import { Button, Card, Col, Input, Row } from 'antd'
import { StyledRow } from '../../StyledComponents'
import RoleSelector from '../../Selectors/RoleSelector'

const StaffSearch = ({ handleSearch }) => {
  return (
    <Card title="Поиск" style={{ marginBottom: '20px' }}>
      <Formik
        initialValues={{
          name: '',
          role: '',
        }}
        onSubmit={(values) => handleSearch(values)}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <StyledRow gutter={10}>
              <Col span={10}>
                <Field name="name">
                  {({ field }) => (
                    <>
                      <Row>Имя:</Row>
                      <Row>
                        <Input
                          placeholder="Введите имя сотрудника"
                          {...field}
                        />
                      </Row>
                    </>
                  )}
                </Field>
              </Col>

              <Col span={10}>
                <Row>Должность:</Row>
                <RoleSelector
                  value={values.role}
                  onChange={(val) => {
                    setFieldValue('role', val)
                  }}
                />
              </Col>

              <Col span={4} style={{ display: 'flex', alignItems: 'flex-end' }}>
                <Button htmlType="submit">Поиск</Button>
              </Col>
            </StyledRow>
          </Form>
        )}
      </Formik>
    </Card>
  )
}

export default StaffSearch
